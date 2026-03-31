const ExcelJS = require('exceljs');
const fs = require('fs');

async function testHyperlinksFinal() {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Test');
  
  // Link clássico
  sheet.getCell('A1').value = {
    text: 'Pedro Oliveira',
    hyperlink: 'https://www.linkedin.com/in/pedro-oliveira-fernandes/'
  };
  
  // Link como resultado de fórmula
  sheet.getCell('A2').value = {
    result: 'Link Formula',
    hyperlink: 'https://linkedin.com/in/formula-link'
  };

  const buffer = await workbook.xlsx.writeBuffer();
  
  // Simular lógica do ImportsService
  const testWorkbook = new ExcelJS.Workbook();
  await testWorkbook.xlsx.load(buffer);
  const worksheet = testWorkbook.getWorksheet(1);
  
  console.log('--- Testando Lógica Final de ImportsService ---');
  
  worksheet.eachRow((row, rowNumber) => {
    const rawValue = row.getCell(1).value;
    let value = '';
    
    if (rawValue && typeof rawValue === 'object') {
       const cell = rawValue;
       if (cell.hyperlink) {
         const text = cell.result !== undefined ? cell.result : (cell.text || '');
         // Se hyperlink for um objeto (pode acontecer dependendo da versão/parser)
         const link = typeof cell.hyperlink === 'object' ? cell.hyperlink.hyperlink || cell.hyperlink.text : cell.hyperlink;
         value = `${text} | ${link}`;
       } else {
         value = cell.result !== undefined ? cell.result : cell.text;
       }
    } else {
      value = rawValue;
    }
    
    console.log(`Linha ${rowNumber}: "${value}"`);
  });
}

testHyperlinksFinal().catch(console.error);
