import React from 'react';
import { number, string } from 'prop-types';
import { Link } from 'react-router-dom';

const RecordTile = ({
  className, count, subtitle, title,
}) => (
  <div className="col-md-6 col-xl-3">
    <Link to='#' className={`card widget-content ${className}`}>
      <div className="widget-content-wrapper text-white">
        <div className="widget-content-left">
          <div className="widget-heading">{title}</div>
          <div className="widget-subheading">{subtitle}</div>
        </div>
        <div className="widget-content-right">
          <div className="widget-numbers text-white">
            <span>{count}</span>
          </div>
        </div>
      </div>
    </Link>
  </div>
);

RecordTile.propTypes = {
  className: string,
  count: number.isRequired,
  subtitle: string.isRequired,
  title: string.isRequired,
};

RecordTile.defaultProps = { className: 'bg-arielle-smile' };

export default RecordTile;
