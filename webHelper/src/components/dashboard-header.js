import React from 'react';
import { func, string } from 'prop-types';
import Button from './button';

const DashboardHeader = ({
  title, onAdd, onDelete, onImport, onExcelExport, onPDFExport,
}) => (
  <div className="card-header-tab card-header">
    <div className="card-header-title font-size-lg text-capitalize font-weight-normal flex-fill">{title}</div>
    <div className="actions">
      <Button onClick={onAdd} className="btn-pill btn-shadow btn-wide btn btn-sm btn-info text-capitalize">
        Add
      </Button>
      <Button onClick={onDelete} className="btn-pill btn-shadow btn-wide btn btn-sm btn-danger spacing">
        Delete
      </Button>
      {/* <Button onClick={onImport} className="btn-pill btn-shadow btn-wide btn btn-sm btn-primary">
        Bulk Import
      </Button> */}
      <Button onClick={onExcelExport} className="ml-2 p-0 btn">
        <img
          src="public/images/icons/excel.svg"
          height={35}
          data-toggle="tooltip"
          data-placement="top"
          title="Export to Excel"
          alt='Export'
        />
      </Button>
      {/* <Button onClick={onPDFExport} className=" mr-3 ml-2 p-0 btn">
        <img alt="Export PDF" src="public/images/icons/pdf.svg" height={35} data-toggle="tooltip" data-placement="top" title="Export to PDF" />
      </Button> */}
    </div>
  </div>
);

DashboardHeader.propTypes = {
  onAdd: func.isRequired,
  onDelete: func.isRequired,
  onExcelExport: func.isRequired,
  onImport: func.isRequired,
  onPDFExport: func.isRequired,
  title: string.isRequired,
};

export default DashboardHeader;
