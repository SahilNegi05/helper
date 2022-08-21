import React from 'react';
import { instanceOf, string, func, bool } from 'prop-types';

const DateCalenderInput = ({
  name, value, onClick, title, disabled,
}, ref) => (
  <div role='presentation' className="calendar-icon" ref={ref} onClick={onClick}>
    <span className="btn-icon-wrapper pr-1 opacity-5 icon">
      <svg
        className="mt-n1"
        stroke="currentColor"
        fill="currentColor"
        strokeWidth={0}
        viewBox="0 0 512 512"
        fontSize="20px"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color: '#000' }}
      >
        <path d="M424 96h-40v24c0 4.4-3.6 8-8 8h-16c-4.4 0-8-3.6-8-8V96H160v24c0 4.4-3.6 8-8 8h-16c-4.4 0-8-3.6-8-8V96H88c-22 0-40 18-40 40v272c0 22 18 40 40 40h336c22 0 40-18 40-40V136c0-22-18-40-40-40zm8 300c0 11-9 20-20 20H100c-11 0-20-9-20-20V216c0-4.4 3.6-8 8-8h336c4.4 0 8 3.6 8 8v180zM160 72c0-4.4-3.6-8-8-8h-16c-4.4 0-8 3.6-8 8v24h32V72zM384 72c0-4.4-3.6-8-8-8h-16c-4.4 0-8 3.6-8 8v24h32V72z" />
      </svg>
    </span>
    <input
      type="text"
      name={name}
      className="form-control datePicker"
      placeholder={title}
      defaultValue={value}
      disabled={disabled}
    />
  </div>
);

DateCalenderInput.propTypes = {
  disabled: bool,
  name: string.isRequired,
  onClick: func.isRequired,
  title: string.isRequired,
  value: instanceOf(Date),
};

DateCalenderInput.defaultProps = {
  disabled: false,
  value: null,
};

export default React.forwardRef(DateCalenderInput);
