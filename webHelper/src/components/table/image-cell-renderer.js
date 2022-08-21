import { string } from 'prop-types';
import React from 'react';

const ImageCellRenderer = ({
  className, image,
}) => (image && image.length ? (
  <img width="35px" height="35px" className={className} src={image} alt="" />
) : null);

ImageCellRenderer.propTypes = {
  className: string,
  image: string.isRequired,
};

ImageCellRenderer.defaultProps = { className: 'rounded-circle' };

export default ImageCellRenderer;
