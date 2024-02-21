// import React, { useState } from 'react'
// import ExcelJS from "exceljs"

// interface CreateWorkbookProps {
//     setWorkbook: React.Dispatch<React.SetStateAction<ExcelJS.Workbook | null>>;
//   }
// const Excel: React.FC<CreateWorkbookProps> = ({setWorkbook}) => {
//     const [wb, setWb] = useState<ExcelJS.Workbook | null>({});
//     const createWorkbook= ()=>{
//         const wb = new ExcelJS.Workbook();
//         setWb(wb)
//         setWorkbook(wb)
//         wb.addWorksheet('Sheet 1');
//         setWorkbook(wb);
//         console.log('Workbook created:', wb);
//     }
//     wb.columns = [
//         { header: 'ID', key: 'id', width: 10 },
//         { header: 'Name', key: 'name', width: 32 },
//         { header: 'Age', key: 'age', width: 15 }
//       ];
//       wb.addRow({ id: 1, name: 'John Doe', age: 30 });
//       wb.addRow({ id: 2, name: 'Jane Smith', age: 25 });
//       wb.addRow({ id: 3, name: 'Bob Johnson', age: 40 });
//     const exportWorkbook = () => {
//         if (wb) {
//           wb.xlsx.writeBuffer().then((buffer:any) => {
//             const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//             const url = window.URL.createObjectURL(blob);
//             const a = document.createElement('a');
//             a.href = url;
//             a.download = 'workbook.xlsx';
//             a.click();
//             window.URL.revokeObjectURL(url);
//           });
//         }
//       };
//   return (
//     <>
   
//    <button onClick={createWorkbook}>create WorkBook</button>
//    <button onClick={exportWorkbook}>Export WorkBook</button>
//    </>
//   )
// }

// export default Excel
import React, { useState } from 'react';
import ExcelJS from 'exceljs';

interface CreateWorkbookProps {
    setWorkbook: React.Dispatch<React.SetStateAction<ExcelJS.Workbook | null>>;

}

const Excel: React.FC<CreateWorkbookProps> = ({setWorkbook}) => {
    const [wb, setWb] = useState<ExcelJS.Workbook | null>(null);

    const createWorkbook = () => {
        const newWorkbook = new ExcelJS.Workbook();
        const sheet = newWorkbook.addWorksheet('Sheet 1');
        sheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Name', key: 'name', width: 32 },
            { header: 'Age', key: 'age', width: 15 }
        ];

        // Add rows to the worksheet
        sheet.addRow({ id: 1, name: 'John Doe', age: 30 });
        sheet.addRow({ id: 2, name: 'Jane Smith', age: 25 });
        sheet.addRow({ id: 3, name: 'Bob Johnson', age: 40 });

        setWb(newWorkbook);
        setWorkbook(newWorkbook);
        console.log('Workbook created:', newWorkbook);
    };

    const exportWorkbook = () => {
        if (wb) {
            wb.xlsx.writeBuffer().then((buffer:any) => {
                const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'workbook.xlsx';
                a.click();
                window.URL.revokeObjectURL(url); //Recheck this line
            });
        }
    };

    return (
        <>
            <button onClick={createWorkbook}>Create Workbook</button>
            <button onClick={exportWorkbook}>Export Workbook</button>
        </>
    );
};

export default Excel;
