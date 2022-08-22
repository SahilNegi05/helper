import React from 'react';
import Header from '../common/Header';


const PublicRoute = ({...rest }) => {
  return (
        <>
                <Header />
                {rest.element}
        </>
  );
};
export default PublicRoute;