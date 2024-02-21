import React from 'react';
import ExcelJS from 'exceljs';

interface DeleteRowProps {
  workbook: ExcelJS.Workbook | null;
  setWorkbook: React.Dispatch<React.SetStateAction<ExcelJS.Workbook | null>>;
}

const DeleteRowComponent: React.FC<DeleteRowProps> = ({ workbook, setWorkbook }) => {
  const deleteRow = (index: number) => {
    if (workbook) {
      const sheet:any = workbook.getWorksheet('Sheet 1');
      sheet.spliceRows(index, 1);
      setWorkbook(workbook);
    }
  };

  return <button onClick={() => deleteRow(1)}>Delete Row</button>;
};

export default DeleteRowComponent;
