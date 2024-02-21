import React from 'react';

interface ExportWorkbookButtonProps {
  exportWorkbook: () => void;
}

const ExportWorkbookButton: React.FC<ExportWorkbookButtonProps> = ({ exportWorkbook }) => {
  return (
    <button onClick={exportWorkbook}>Export Workbook</button>
  );
};

export default ExportWorkbookButton;