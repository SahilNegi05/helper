import { bool, func, string } from 'prop-types';
import React from 'react';

const CheckBox = ({
  title, name, id, className, onChange, value, ...rest
}) => (
  <>
    <div className="position-relative form-check">
      <input name={name} id={id} type="checkbox" className={`form-check-input ${className}`} onChange={onChange} value={value} {...rest} />
      <label htmlFor={id} className="form-check-label">{title}</label>
    </div>
  </>
);

CheckBox.propTypes = {
  className: string,
  id: string.isRequired,
  name: string.isRequired,
  onChange: func.isRequired,
  title: string.isRequired,
  value: bool.isRequired,
};

CheckBox.defaultProps = { className: '' };

export default CheckBox;
