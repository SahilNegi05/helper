import React from 'react';
import { Switch } from 'react-router-dom';
import configureRoutes from './routes';
import SingleRoute from './single-route';

const Routes = () => {
  const routes = configureRoutes();

  return (
    <Switch>
      {routes.map((route) => (
        <SingleRoute exact key={route.path} {...route} />
      ))}
    </Switch>
  );
};

export default Routes;
