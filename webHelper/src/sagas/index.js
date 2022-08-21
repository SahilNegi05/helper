import { all } from 'redux-saga/effects';
import app from './app';
import user from './user';

const sagas = function* sagas() {
  yield all([
    app(),
    user(),
  ]);
};

export default sagas;
