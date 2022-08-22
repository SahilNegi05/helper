import React, { useState } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import Navbar from "../common/Navbar";
import { useSelector } from 'react-redux'

const PrivateRoute = ({ ...rest }) => {
  const getToken = useSelector((state) => state.userToken.authenticate[0]);
  if(getToken) {
    return (
      <><Navbar/>
        {rest.element}
      </>
    )
  } else {
    return <Navigate to='/Login' />
  }
  
};

export default PrivateRoute;
