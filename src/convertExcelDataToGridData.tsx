import ExcelJS from "exceljs"

export const convertExcelDataToGridData = (workbook: ExcelJS.Workbook | null) => {
    if (workbook) {
        const sheet: any = workbook.getWorksheet('Sheet 1');
        const columns = sheet.columns.map(col => ({
            field: col.key,
            headerName: col.header,
            width: 150,
        }));
        const rows = sheet.getSheetValues().map(row => {
            const rowData: any = {};
            row.forEach((cellValue, index) => {
                const columnKey = columns[index].field;
                rowData[columnKey] = cellValue;
            });
            return rowData;
        });
        return { columns, rows };
    }
    return { columns: [], rows: [] }; 
};
