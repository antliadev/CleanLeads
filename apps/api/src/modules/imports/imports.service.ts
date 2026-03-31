import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as ExcelJS from 'exceljs';
import { parse } from 'csv-parse/sync';
import { LeadsService } from '../leads/services/leads.service';

@Injectable()
export class ImportsService {
  constructor(
    private prisma: PrismaService,
    private leadsService: LeadsService,
  ) {}

  async processUpload(file: Express.Multer.File, userId: string) {
    let rows: any[] = [];
    let headers: string[] = [];

    if (file.originalname.endsWith('.xlsx') || file.originalname.endsWith('.xls')) {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(file.buffer as any);
      const worksheet = workbook.getWorksheet(1);
      
      if (!worksheet) throw new BadRequestException('Planilha vazia ou inválida');

      // Encontrar a primeira linha com dados para ser o cabeçalho
      let headerRowNumber = 1;
      worksheet.eachRow((row, rowNumber) => {
        if (headers.length === 0 && row.values && (row.values as any[]).length > 1) {
          headerRowNumber = rowNumber;
          const values = Array.isArray(row.values) ? row.values : [];
          headers = values.slice(1).map(v => {
             // Lidar com objetos de célula (rich text, formulas, etc)
             if (v && typeof v === 'object') {
               return String((v as any).result || (v as any).text || '');
             }
             return String(v || '').trim();
          }).filter(h => h !== '');
        }
      });

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber <= headerRowNumber) return; // Pular cabeçalho e linhas vazias anteriores
        
        const values = Array.isArray(row.values) ? row.values : [];
        const rowData = {};
        let hasData = false;

        headers.forEach((header, index) => {
          const rawValue = values[index + 1];
          let value: any = '';
          
          if (rawValue && typeof rawValue === 'object') {
             const cell = rawValue as any;
             // Buscar hyperlink em qualquer lugar do objeto (ExcelJS às vezes aninha)
             const hyperlink = cell.hyperlink?.hyperlink || cell.hyperlink;
             const text = cell.result !== undefined ? cell.result : (cell.text || '');
             
             if (hyperlink) {
               value = `${text} | ${hyperlink}`;
             } else {
               value = text !== undefined ? text : JSON.stringify(cell);
             }
          } else {
            value = rawValue;
          }
          
          rowData[header] = value !== undefined && value !== null ? String(value).trim() : '';
          if (rowData[header]) hasData = true;
        });

        if (hasData) {
          rows.push(rowData);
        }
      });
    } else if (file.originalname.endsWith('.csv')) {
      const content = file.buffer.toString('utf-8');
      const records = parse(content, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
      });
      if (records.length > 0) {
        headers = Object.keys(records[0] as any);
        rows = records;
      }
    } else {
      throw new BadRequestException('Formato de arquivo não suportado (.xlsx, .xls, .csv)');
    }

    if (rows.length === 0) {
      throw new BadRequestException('O arquivo não contém dados válidos');
    }

    // Criar lote inicial
    const batch = await this.prisma.leadImportBatch.create({
      data: {
        fileName: file.originalname,
        originalFileType: file.mimetype,
        uploadedByUserId: userId,
        status: 'PENDING',
        totalRows: rows.length,
      },
    });

    // Criar linhas cruas para auditoria
    await this.prisma.leadImportRow.createMany({
      data: rows.map((row, index) => ({
        importBatchId: batch.id,
        rowNumber: index + 2, 
        rawPayload: row,
      })),
    });

    return {
      batchId: batch.id,
      headers,
      preview: rows.slice(0, 5),
      totalRows: rows.length,
    };
  }

  async confirmImport(batchId: string, mapping: any) {
    const batch = await this.prisma.leadImportBatch.findUnique({
      where: { id: batchId },
    });

    if (!batch) throw new BadRequestException('Lote não encontrado');

    // Atualizar status e mapping
    await this.prisma.leadImportBatch.update({
      where: { id: batchId },
      data: {
        status: 'PROCESSING',
        mappingSnapshot: mapping,
      },
    });

    // Iniciar processamento real dos leads (Normalização -> Validação -> Classificação)
    // Em um cenário de alta escala, isso seria um Job em segundo plano no BullMQ.
    // Para a V1, processaremos de forma assíncrona mas imediata.
    this.leadsService.processImportBatch(batchId).catch(err => {
      console.error(`Erro ao processar lote ${batchId}:`, err);
    });

    return { success: true, message: 'Processamento iniciado' };
  }
}
