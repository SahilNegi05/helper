import { string } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const LinkableCellRenderer = ({
  href, className, text,
}) => (href && href.length ? (
  <Link to={href} className={`${className}`}>
    {text}
  </Link>
) : null);

LinkableCellRenderer.propTypes = {
  className: string,
  href: string.isRequired,
  text: string.isRequired,
};

LinkableCellRenderer.defaultProps = { className: '' };

export default LinkableCellRenderer;
