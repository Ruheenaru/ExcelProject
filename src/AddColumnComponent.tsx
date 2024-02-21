// AddColumnComponent.tsx
import React from 'react';
import ExcelJS from 'exceljs';

interface AddColumnProps {
  workbook: ExcelJS.Workbook | null;
  setWorkbook: React.Dispatch<React.SetStateAction<ExcelJS.Workbook | null>>;
}

const AddColumnComponent: React.FC<AddColumnProps> = ({ workbook, setWorkbook }) => {
  const addColumn = () => {
    if (workbook) {
      const sheet:any = workbook.getWorksheet('Sheet 1');
      const maxColumns = 5; // Maximum number of columns supported by Excel
      const currentColumnCount = sheet.columnCount;
      
      if (currentColumnCount < maxColumns) {
        const newColumnIndex = currentColumnCount + 1; // Increment to get the index for the new column
        const newColumn = { header: `New Column ${newColumnIndex}`, key: `newColumn${newColumnIndex}`, width: 10 };
        sheet.columns = [...sheet.columns, newColumn];
        setWorkbook(workbook);
      } else {
        console.error('Maximum number of columns reached');
      }
    }
  };

  return <button onClick={addColumn}>Add Column</button>;
};

export default AddColumnComponent;
