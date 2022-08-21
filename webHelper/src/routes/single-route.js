
import React from 'react';
import { useSelector } from 'react-redux';
import { any, arrayOf, bool, number, oneOf, oneOfType, string } from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import ErrorLayout from './error-layout';
import PrivateLayout from './private-layout';
import PublicLayout from './public-layout';

const SingleRoute = ({
  accessible, component: Component, type, ...rest
}) => {
  const {
    token, userDetail,
  } = useSelector((store) => ({
    token: store.user.token,
    userDetail: store.user.userDetail,
  }));

  if (rest.path === '/login' && token) {
    return <Redirect from={rest.path} to="/post-jobs" />;
  }

  if (type === 'private' && !token) {
    return <Redirect from={rest.path} to="/login" />;
  }

  // if (type === 'private' && token && !accessible?.includes(userDetail.user_type_id)) {
  //   return <Redirect from={rest.path} to="/forbidden-access" />;
  // }

  let Layout = PublicLayout;

  if (type === 'private') {
    Layout = PrivateLayout;
  } else if (type === 'error') {
    Layout = ErrorLayout;
  }

  return (
    <Route
      path={rest.path}
      render={() => (
        <Layout {...rest}>
          <Component {...rest} />
        </Layout>
      )}
      {...rest}
    />
  );
};

SingleRoute.propTypes = {
  accessible: arrayOf(number),
  component: any.isRequired,
  exact: bool.isRequired,
  path: oneOfType([arrayOf(string).isRequired, string.isRequired]).isRequired,
  title: string.isRequired,
  type: oneOf(['public', 'private', 'error']).isRequired,
};
SingleRoute.defaultProps = { accessible: null };
export default SingleRoute;