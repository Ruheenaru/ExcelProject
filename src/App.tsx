// App.tsx
import React, { useState } from 'react';
import Excel from './Excel';
import AddRowComponent from './AddRowComponent';
import AddColumnComponent from './AddColumnComponent';
import DeleteRowComponent from './DeleteRowComponent';
import DeleteColumnComponent from './DeleteColumnComponent';

import ExcelJS from 'exceljs';
import CustomDataGrid from './CustomDataGrid';

function App() {
  const [workbook, setWorkbook] = useState<ExcelJS.Workbook | null>(null);
  const [gridColumns, setGridColumns] = useState([]);
  const [gridRows, setGridRows] = useState([]);

  // Function to convert Excel data to rows and columns compatible with DataGrid
  const convertExcelDataToGridData = (workbook: ExcelJS.Workbook | null) => {
    if (workbook) {
      const sheet:any = workbook.getWorksheet('Sheet 1');
      const columns = sheet.columns.map(col => ({
        field: col.key,
        headerName: col.header,
        width: 150,
      }));
      const rows = sheet.getSheetValues();
      setGridColumns(columns);
      setGridRows(rows);
    }
  };

  // Call the conversion function whenever the workbook changes
  React.useEffect(() => {
    convertExcelDataToGridData(workbook);
  }, [workbook]);

  return (
    <>
      <Excel setWorkbook={setWorkbook} />
      <AddRowComponent workbook={workbook} setWorkbook={setWorkbook} />
      <AddColumnComponent workbook={workbook} setWorkbook={setWorkbook} />
      <DeleteRowComponent workbook={workbook} setWorkbook={setWorkbook} />
      <DeleteColumnComponent workbook={workbook} setWorkbook={setWorkbook} />

      {/* Render the DataGrid with the converted data */}
      <CustomDataGrid columns={gridColumns} rows={gridRows} />
    </>
  );
}

export default App;
