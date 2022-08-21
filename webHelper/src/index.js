import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/es/integration/react';
import ReactScroll from 'react-scroll';
import configureStore from './config/configure-store';
import Routes from './routes';
import ErrorBoundary from './error-boundary';
import { Loader } from './components';
import './utility/string-en';

const history = createBrowserHistory();
const {
  persistor, store,
} = configureStore(history);

let prevLocation = {};

history.listen((location) => {
  const pathChanged = prevLocation?.pathname !== location.pathname;
  const hashChanged = prevLocation?.hash !== location.hash;

  if (pathChanged || hashChanged) {
    ReactScroll.animateScroll.scrollToTop();
  }
  prevLocation = location;
});
const Application = () => (
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <>
        <ConnectedRouter history={history}>
          <ErrorBoundary>
            <React.Suspense fallback={<Loader />}>
              <Routes />
            </React.Suspense>
          </ErrorBoundary>
        </ConnectedRouter>
        <Loader />
      </>
    </PersistGate>
  </Provider>
);
export default Application;
