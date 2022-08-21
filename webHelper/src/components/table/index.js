import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { any, arrayOf, bool, func, shape, string } from 'prop-types';
import LinkableCellRenderer from './linkable-cell-renderer';
import ImageCellRenderer from './image-cell-renderer';
import BadgeCellRenderer from './badge-cell-render';

const defaultColDef = {
  filter: 'agTextColumnFilter',
  floatingFilter: true,
  floatingFilterComponentParams: { suppressFilterButton: true },
  pagination: true,
  resizable: true,
  sortable: true,
  suppressCellSelection: true,
  suppressFiltersToolPanel: true,
  suppressMenu: true,
  unSortIcon: true,
};

const Table = ({
  children, data, agGridConf, onGridReady, sizeColumnsToFit, ...rest
}) => {
  const onReady = (params) => {
    if (sizeColumnsToFit && params.api.sizeColumnsToFit) {
      params.api.sizeColumnsToFit();
    }

    onGridReady(params);
  };

  return (
    <div className="ag-theme-alpine ag-grid-custom-height">
      <AgGridReact
        pagination
        paginationPageSize={10}
        paginationNumberFormatter={(params) => `${params.value.toLocaleString()}`}
        defaultColDef={{
          ...defaultColDef, ...agGridConf,
        }}
        rowData={data}
        onGridReady={onReady}
        frameworkComponents={{
          badgeCellRenderer: BadgeCellRenderer,
          imageCellRenderer: ImageCellRenderer,
          linkableCellRenderer: LinkableCellRenderer,
        }}
        {...rest}
      >
        {children}
      </AgGridReact>
    </div>
  );
};

Table.propTypes = {
  agGridConf: shape({ rowSelection: string }),
  children: any.isRequired,
  data: arrayOf(shape).isRequired,
  onGridReady: func,
  sizeColumnsToFit: bool,
};

Table.defaultProps = {
  agGridConf: {},
  onGridReady: () => {},
  sizeColumnsToFit: true,
};

export default Table;
