import React from 'react';
import { string } from 'prop-types';

const Slide = ({
  className, description, image, title,
}) => {
  const imageStyle = { backgroundImage: `url("${image}")` };

  return (
    <div>
      <div
        className={`position-relative h-100 d-flex justify-content-center align-items-center ${className}`}
        tabIndex={-1}
      >
        <div className="slide-img-bg" style={imageStyle} />
        <div className="slider-content">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

Slide.propTypes = {
  className: string,
  description: string.isRequired,
  image: string.isRequired,
  title: string.isRequired,
};

Slide.defaultProps = { className: '' };

export default Slide;
