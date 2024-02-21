// DataGrid.tsx
import React from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

interface DataGridProps {
  columns: GridColDef[];
  rows: GridRowsProp;
}

const CustomDataGrid: React.FC<DataGridProps> = ({ columns, rows }) => {
  return <DataGrid columns={columns} rows={rows} />;
};

export default CustomDataGrid;

/// <reference types="@mui/x-data-grid/types/index" />