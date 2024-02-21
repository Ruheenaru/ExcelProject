// // EditComponent.tsx
// import React, { useState } from 'react';
// import ExcelJS from 'exceljs';

// interface EditComponentProps {
//   workbook: ExcelJS.Workbook | null;
//   setWorkbook: React.Dispatch<React.SetStateAction<ExcelJS.Workbook | null>>;
// }

// const EditComponent: React.FC<EditComponentProps> = ({ workbook, setWorkbook }) => {
//   const [rowData, setRowData] = useState<{ [key: string]: string }>({});
//   const [selectedRow, setSelectedRow] = useState<number | null>(null);
//   const [selectedColumn, setSelectedColumn] = useState<string | null>(null);

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setRowData({ ...rowData, [name]: value });
//   };

//   const handleSubmit = () => {
//     if (workbook && selectedRow !== null && selectedColumn !== null) {
//       const sheet = workbook.getWorksheet('Sheet 1');
//       sheet.getCell(selectedRow + 1, selectedColumn).value = rowData[selectedColumn] || '';
//       setWorkbook(workbook);
//       setRowData({});
//       setSelectedRow(null);
//       setSelectedColumn(null);
//     }
//   };

//   const handleCellClick = (rowIndex: number, columnKey: string) => {
//     setSelectedRow(rowIndex);
//     setSelectedColumn(columnKey);
//     const sheet = workbook?.getWorksheet('Sheet 1');
//     if (sheet) {
//       const cellValue = sheet.getCell(rowIndex + 1, columnKey).value as string;
//       setRowData({ ...rowData, [columnKey]: cellValue });
//     }
//   };

//   return (
//     <div>
//       <h2>Edit Cell</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Value:
//           <input type="text" name={selectedColumn || ''} value={rowData[selectedColumn || '']} onChange={handleChange} />
//         </label>
//         <button type="submit">Save</button>
//       </form>
//       <div>
//         <h2>Click on a cell to edit</h2>
//         <table>
//           <thead>
//             <tr>
//               {workbook?.getWorksheet('Sheet 1').columns.map((col) => (
//                 <th key={col.key}>{col.header}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {workbook?.getWorksheet('Sheet 1').eachRow((row, rowIndex) => (
//               <tr key={rowIndex}>
//                 {row.eachCell({ includeEmpty: true }, (cell, colIndex) => (
//                   <td key={`${rowIndex}-${colIndex}`} onClick={() => handleCellClick(rowIndex, cell.column.key)}>
//                     {cell.value}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default EditComponent;


import React, { useState } from 'react';
import ExcelJS from 'exceljs';

interface EditComponentProps {
  workbook: ExcelJS.Workbook | null;
  setWorkbook: React.Dispatch<React.SetStateAction<ExcelJS.Workbook | null>>;
}

const EditComponent: React.FC<EditComponentProps> = ({ workbook, setWorkbook }) => {
  const [rowData, setRowData] = useState<{ [key: string]: string }>({});
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRowData({ ...rowData, [name]: value });
  };

  const handleSubmit = () => {
    if (workbook && selectedRow !== null && selectedColumn !== null) {
      const sheet = workbook.getWorksheet('Sheet 1');
      if (sheet) {
        const cell = sheet.getCell(selectedRow + 1, selectedColumn);
        if (cell) {
          cell.value = rowData[selectedColumn] || '';
          setWorkbook(workbook);
          setRowData({});
          setSelectedRow(null);
          setSelectedColumn(null);
        }
      }
    }
  };

  const handleCellClick = (rowIndex: number, columnKey: string) => {
    setSelectedRow(rowIndex);
    setSelectedColumn(columnKey);
    const sheet = workbook?.getWorksheet('Sheet 1');
    if (sheet) {
      const cell = sheet.getCell(rowIndex + 1, columnKey);
      if (cell) {
        const cellValue = cell.value as string;
        setRowData({ ...rowData, [columnKey]: cellValue });
      }
    }
  };

  return (
    <div>
      <h2>Edit Cell</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Value:
          <input type="text" name={selectedColumn || ''} value={rowData[selectedColumn || '']} onChange={handleChange} />
        </label>
        <button type="submit">Save</button>
      </form>
      <div>
        <h2>Click on a cell to edit</h2>
        <table>
          <thead>
            <tr>
              {workbook?.getWorksheet('Sheet 1')?.columns.map((col) => (
                <th key={col.key}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
  {
  workbook && workbook.getWorksheet('Sheet 1') && workbook.getWorksheet('Sheet 1').eachRow((row, rowIndex) => (
    <tr key={rowIndex}>
      {row.eachCell({ includeEmpty: true }, (cell, colIndex) => (
        <td key={`${rowIndex}-${colIndex}`} onClick={() => handleCellClick(rowIndex, cell.column.key)}>
          {cell.value}
        </td>
      ))}
    </tr>
  ))}
</tbody>


        </table>
      </div>
    </div>
  );
};

export default EditComponent;
