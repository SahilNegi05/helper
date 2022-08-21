import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Button } from '../components';

const NotFound = () => {
  const dispatch = useDispatch();

  return (
    <div
      style={{
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      }}
      className="container custom-404"
    >
      <div className="not-found-bg">
        <img alt='error 404' src="https://preview.ibb.co/d2fA19/404_error.png" />
      </div>
      <Button onClick={() => dispatch(push('/'))}>Go Back to Home</Button>
    </div>
  );
};

export default NotFound;
