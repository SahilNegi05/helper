import React from 'react';
import { Helmet } from 'react-helmet';
import { any, string } from 'prop-types';

const ErrorLayout = ({
  children, title,
}) => (
  <div className="app-container app-theme-white body-tabs-shadow">
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <div className="app-container">
      <div className="h-100">
        <div className="h-100 no-gutters row">
          <div className="h-100 d-flex bg-white justify-content-center align-items-center col-md-12 col-lg-12">
            {children}
          </div>
        </div>
      </div>
    </div>
  </div>
);

ErrorLayout.propTypes = {
  children: any.isRequired,
  title: string.isRequired,
};

export default ErrorLayout;
