import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import configureRoutes from "./routes";
import PrivateLayout from "./private-layout";
import PublicLayout from "./public-layout";
import ErrorLayout from "./error-Layout";

const MainRoutes = () => {
  const routes = configureRoutes();
  // console.log(routes)

  return (
    <>
      <BrowserRouter>
        <Routes>
          {routes.map((route) => {
            if (route.type === "private") {
              return (
                <Route path={route.path} element={<PrivateLayout {...route} />}/>
              );
            } 
            if (route.type === "public") {
              return( <Route path={route.path} element={<PublicLayout {...route} />} />);
            } 
          })}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default MainRoutes;
