import { string } from 'prop-types';
import React from 'react';

const BadgeCellRenderer = ({
  className, text,
}) => (text && text.length ? (
  <span className={`${className}`}>
    {text}
  </span>
) : null);

BadgeCellRenderer.propTypes = {
  className: string,
  text: string.isRequired,
};

BadgeCellRenderer.defaultProps = { className: 'badge badge-success' };

export default BadgeCellRenderer;
