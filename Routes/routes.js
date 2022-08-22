import React from 'react';
import Details from '../pages/Opportunities/Details';



//Common
const PageNotFound = React.lazy(() => import('../error/PageNotFound'))
const ForbiddenAccess = React.lazy(() => import('../error/ForbiddenAccess'));


// login-SignUp
const Login = React.lazy(() => import('../pages/user/login'))
const NewUserForm = React.lazy(() => import('../pages/user/NewUserForm'))
const Registration = React.lazy(() => import('../pages/user/registration'))




const configureRoutes = () => {
  const routes = [
 
    {
      element: <Login />,
      exact: true,
      path: '/Login',
      title: 'login page',
      type: 'public',
    },
    {
      element: <NewUserForm />,
      exact: true,
      path: '/NewUserForm',
      title: 'SignUp page',
      type: 'public',
    },
    
    {
      element: <ForbiddenAccess />,
      exact: true,
      path: '/forbidden-access',
      title: '403 Forbidden Access',
      type: 'error',
    },
    {
      element: <PageNotFound />,
      exact: true,
      path: '*',
      title: '404 Not Found',
      type: 'public',
    }
  ];

  return routes;
};

export default configureRoutes;
