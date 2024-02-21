// ParentComponent.tsx
import React, { useState } from 'react';

import ExportWorkbookButton from './ExportWorkbookButton';
import Excel from './Excel';
import ExcelJS from 'exceljs';

const ParentComponent: React.FC = () => {
  const [workbook, setWorkbook] = useState<ExcelJS.Workbook | null>(null);

  const exportWorkbook = () => {
    if (workbook) {
      workbook.xlsx.writeBuffer().then((buffer:any) => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'workbook.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      });
    }
  };

  return (
    <div>
      <Excel setWorkbook={setWorkbook} />
      <ExportWorkbookButton exportWorkbook={exportWorkbook} />
      {/* Other components and functionality related to the workbook */}
    </div>
  );
};

export default ParentComponent;
