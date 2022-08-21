import storage from 'redux-persist/lib/storage';
import { persistCombineReducers } from 'redux-persist';
import { connectRouter } from 'connected-react-router';
import app from './app';
import user from './user';

const config = {
  blacklist: ['app'],
  key: 'primary',
  storage,
};

export default (history) => persistCombineReducers(config, {
  app,
  router: connectRouter(history),
  user,
});
