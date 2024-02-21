import React from 'react';
import ExcelJS from 'exceljs';

interface DeleteColumnProps {
  workbook: ExcelJS.Workbook | null;
  setWorkbook: React.Dispatch<React.SetStateAction<ExcelJS.Workbook | null>>;
}

const DeleteColumnComponent: React.FC<DeleteColumnProps> = ({ workbook, setWorkbook }) => {
  const deleteColumn = (index: number) => {
    if (workbook) {
      const sheet:any = workbook.getWorksheet('Sheet 1');
      sheet.spliceColumns(index, 1);
      setWorkbook(workbook);
    }
  };

  return <button onClick={() => deleteColumn(1)}>Delete Column</button>;
};

export default DeleteColumnComponent;
