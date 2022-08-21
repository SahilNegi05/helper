import { bool } from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

const Loader = ({ visible }) => {
  const open = useSelector((store) => store.app.visible);

  return (visible || open) ? <div id="UIloader" /> : null;
};

Loader.propTypes = { visible: bool };
Loader.defaultProps = { visible: false };

export default Loader;
