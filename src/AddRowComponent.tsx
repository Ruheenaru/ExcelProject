import React from 'react';
import ExcelJS from 'exceljs';

interface AddRowProps {
  workbook: ExcelJS.Workbook | null;
  setWorkbook: React.Dispatch<React.SetStateAction<ExcelJS.Workbook | null>>;
}

const AddRowComponent: React.FC<AddRowProps> = ({ workbook, setWorkbook }) => {
  const addRow = () => {
    if (workbook) {
      const sheet:any = workbook.getWorksheet('Sheet 1');
      sheet.addRow([
        {
          
        }
      ]);  //Add sample data
      setWorkbook(workbook);
    }
  };

  return <button onClick={addRow}>Add Row</button>;
};

export default AddRowComponent;
