import React from 'react';
import { Helmet } from 'react-helmet';
//import Slider from 'react-slick';
import { any, func, string } from 'prop-types';
import { Slide } from '../components';
import { Drawer, Footer, Header } from '../components';

const NextButton = (props) => {
  const {
    className, style, onClick,
  } = props;

  return (
    <button
      onClick={onClick}
      aria-label="Next"
      type="button"
      className={className}
      style={style}
    >
      Next
    </button>
  );
};

const BackButton = (props) => {
  const {
    className, style, onClick,
  } = props;

  return (
    <button
      onClick={onClick}
      aria-label="Back"
      type="button"
      className={className}
      style={style}
    >
      Back
    </button>
  );
};

const settings = {
  autoplay: true,
  autoplaySpeed: 5000,
  dots: true,
  fade: true,
  infinite: true,
  nextArrow: <NextButton />,
  pauseOnHover: true,
  prevArrow: <BackButton />,
  slidesToScroll: 1,
  slidesToShow: 1,
  speed: 500,
};

const PublicLayout = ({
  children, title, ...rest
}) => (
  <div className="app-container app-theme-white body-tabs-shadow">
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <Header {...rest} />
    <div className='section_block'>{children}</div>
    <Footer />
  </div>
);

PublicLayout.propTypes = {
  children: any.isRequired,
  title: string.isRequired,
};

BackButton.propTypes = {
  className: string.isRequired,
  onClick: func.isRequired,
  style: string.isRequired,
};

NextButton.propTypes = {
  className: string.isRequired,
  onClick: func.isRequired,
  style: string.isRequired,
};

export default PublicLayout;
