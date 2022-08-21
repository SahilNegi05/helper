import { any, func, string } from 'prop-types';
import React from 'react';

const Button = ({
  children, className, onClick, ...rest
}) => (
  <button type="button" className={className} onClick={onClick} {...rest}>
    {children}
  </button>
);

Button.propTypes = {
  children: any.isRequired,
  className: string,
  onClick: func.isRequired,
  type: string,
};

Button.defaultProps = {
  className: 'btnn',
  type: 'button',
};

export default Button;
