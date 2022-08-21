import { applyMiddleware, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router';
import rootReducer from '../reducers';
import sagas from '../sagas';

const ConfigureStore = (history) => {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const sagaMiddleware = createSagaMiddleware();
  const routerMiddleware = createRouterMiddleware(history);
  const isEnhancerAvailable = process.env.NODE_ENV !== 'production'
    && typeof composeEnhancer === 'function';
  const middleware = isEnhancerAvailable
    ? composeEnhancer(applyMiddleware(routerMiddleware, sagaMiddleware))
    : applyMiddleware(routerMiddleware, sagaMiddleware);

  const store = createStore(rootReducer(history), middleware);
  const persistor = persistStore(store);

  sagaMiddleware.run(sagas);

  return {
    persistor,
    store,
  };
};

export default ConfigureStore;
