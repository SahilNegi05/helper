import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function DataTable(props) {
  const { rows, columns, pageSize, rowsPerPageOptions } = props
  return (
    <div style={{ height: 1180, width: '100%' }}>
      {/* <TableRow style={{ height: 10 }}>
        <TableRowColumn style={{ height: 'auto !important' }}>Height</TableRowColumn>
        <TableRowColumn style={{ height: 'auto !important' }}>10px</TableRowColumn>
      </TableRow> */}
      <DataGrid
        style={{ height: 'auto !important' }}
        pagination
        rows={rows} 
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={rowsPerPageOptions}
        checkboxSelection
        pageinatin={false}

      />
    </div>
  );
}