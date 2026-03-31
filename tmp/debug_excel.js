const ExcelJS = require('exceljs');
const path = require('path');

async function debugExcel(filePath) {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1);
    
    console.log(`Planilha: ${worksheet.name}`);
    
    let headers = [];
    worksheet.eachRow((row, rowNumber) => {
      // row.values for index 0 is always null in ExcelJS
      // row.values for index 1+ are the cell values
      const values = Array.isArray(row.values) ? row.values : [];
      
      if (rowNumber === 1) {
        headers = values.slice(1); // Usually starts from index 1 as index 0 is empty
        console.log('--- HEADERS ---');
        console.log(headers);
      } else if (rowNumber <= 6) {
        console.log(`--- ROW ${rowNumber} ---`);
        console.log(values.slice(1));
      }
    });
  } catch (err) {
    console.error('ERROR:', err.message);
  }
}

debugExcel("C:\\Users\\pedro\\Downloads\\Pasta1.xlsx");
