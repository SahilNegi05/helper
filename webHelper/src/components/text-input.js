import { func, string } from 'prop-types';
import React from 'react';

const TextInput = ({
  title, name, id, placeholder, className, onChange, type, value, ...rest
}) => (
  <>
    <div className="position-relative form-group">
      <label htmlFor="exampleEmail">{title}</label>
      <input
        autoComplete="off"
        type={type}
        className={`form-control ${className}`}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        {...rest}
        value={value}
      />
    </div>
  </>
);

TextInput.propTypes = {
  className: string,
  id: string.isRequired,
  name: string.isRequired,
  onChange: func.isRequired,
  placeholder: string.isRequired,
  title: string.isRequired,
  type: string,
  value: string.isRequired,
};

TextInput.defaultProps = {
  className: '',
  type: 'text',
};

export default TextInput;
