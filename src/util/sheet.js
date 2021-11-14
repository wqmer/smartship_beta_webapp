import XLSX from 'xlsx'
import moment from 'moment'
// import fs from 'fs'


function generateSheet(req) {
   req.forEach(record => {
      XLSX.writeFile(record.workbook, `${record.agentType}-${moment().format('MMMM Do YYYY h:mm a')}.xlsx`)
   });
}

function readExcel(file) {
   const promise = new Promise((resovle, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file)
      fileReader.onload = (e) => {
         const bufferArray = e.target.result;
         const wb = XLSX.read(bufferArray, { type: 'buffer' });
         const wsname = wb.SheetNames[0];
         const ws = wb.Sheets[wsname];
         const data = XLSX.utils.sheet_to_json(ws)
         resovle(data)
      }

      fileReader.onerror = (error) => {
         reject(error)
      };
   });

   // promise.then(r => console.log(d))
   return promise
}

export {
   readExcel,
   generateSheet
}