import { all, call, delay, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  CHANGE_PASSWORD,
  changePasswordFailure,
  changePasswordRequested,
  changePasswordSuccess,
  FORGOT_PASSWORD,
  forgotPasswordFailure,
  forgotPasswordRequested,
  forgotPasswordSuccess,
  FETCH_MY_PROFILE_DETAIL,
  fetchMyProfileDetailFailure,
  fetchMyProfileDetailRequested,
  fetchMyProfileDetailSuccess,
  LOGIN,
  LOGIN_SUCCESS,
  loginFailure,
  loginRequested,
  loginSuccess,
  GENERATE_OTP,
  generateOtpRequested,
  genearteOtpfailure,
  generateOtpSuccess,
  genearteOtp,
  LOGOUT,
  logoutFailure,
  logoutRequested,
  logoutSuccess,
  UPDATE_PROFILE_DETAIL,
  updateProfileDetailFailure,
  updateProfileDetailRequested,
  updateProfileDetailSuccess
} from '../actions/user-action-types';
import { userLoginModal, userLoginModalHide } from '../../src/actions/app-action-types';
import httpClient from './http-client';
import { API_PATH } from '../constants/path';

export function* loginHandler({ payload }) {
  yield put(generateOtpRequested());

  const request = {
    data: payload,
    method: 'POST',
    url: 'job-apis.php?type=login',
  };



  const {
    data, error,
  } = yield call(httpClient, request, true, false);

  if (error) {
    yield put(loginFailure(error));
    alert('Enter valid email or password');
  } else {
    yield put(loginSuccess(payload.token));
    yield delay(200);
    yield put(push('/'));
  }
}

export function* otpHandler({ payload }) {
  yield put(loginRequested());

  const request = {
    data: payload,
    method: 'GET',
    url: API_PATH + 'logincheck&username=' + payload.username + '&passwd=' + payload.passwd,
  };

  console.log('============', request)

  const {
    data, error,
  } = yield call(httpClient, request, true, false);

  if (error) {
    console.log(error)
    yield put(loginFailure(error));
  } else {
    // console.log("################",data.data[0].token)
    yield put(loginSuccess({
      token: data.data[0].token,
      userId: data.data[0].customer_id
    }));
    yield delay(200);
    yield put(push('/'));
    yield put(userLoginModal())
    yield delay(7000);
    yield put(userLoginModalHide())

  }
}

export function* forgotPasswordHandler({ payload }) {
  yield put(forgotPasswordRequested());

  const request = {
    method: 'PUT',
    params: payload,
    url: 'forgot-password',
  };

  const { error } = yield call(httpClient, request, true, false);

  if (error) {
    yield put(forgotPasswordFailure(error));
  } else {
    alert('Password reset instructions has been sent on your registered email.');
    yield put(forgotPasswordSuccess());
    yield put(push('/'));
  }
}

export function* logoutHandler() {
  yield put(logoutRequested());

  const request = {
    method: 'PUT',
    url: 'logout',
  };

  const { error } = yield call(httpClient, request, true, true);

  if (error) {
    yield put(logoutFailure(error));
  } else {
    yield put(logoutSuccess());
    yield put(push('/'));
  }
}

export function* changePasswordHandler({ payload }) {
  yield put(changePasswordRequested());

  const request = {
    method: 'POST',
    params: payload,
    url: 'change-password',
  };

  const { error } = yield call(httpClient, request, true, true);

  if (error) {
    yield put(changePasswordFailure(error));
  } else {
    yield put(changePasswordSuccess());
    yield put(push('/my-profile'));
  }
}

export function* fetchProfileHandler({ payload }) {
  yield put(fetchMyProfileDetailRequested());

  const request = {
    method: 'GET',
    params: payload,
    url: 'my-profile',
  };

  const {
    data, error,
  } = yield call(httpClient, request, true, true);

  if (error) {
    yield put(fetchMyProfileDetailFailure(error));
  } else {
    yield put(fetchMyProfileDetailSuccess(data.data));
  }
}

export function* updateProfileHandler({ payload }) {
  yield put(updateProfileDetailRequested());
  const body = new FormData();

  body.append('name', payload.name);
  body.append('password', payload.password);
  body.append('phone_number', payload.phone_number);

  if (payload.image) {
    body.append('image', payload.image);
  }

  const request = {
    data: body,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    url: 'profile-update',
  };

  const { error } = yield call(httpClient, request, true, true);

  if (error) {
    yield put(updateProfileDetailFailure(error));
  } else {
    yield put(updateProfileDetailSuccess());
    yield put(push('/my-profile'));
  }
}

function* user() {
  yield all([
    takeLatest(CHANGE_PASSWORD, changePasswordHandler),
    takeLatest(FORGOT_PASSWORD, forgotPasswordHandler),
    takeLatest(LOGIN, loginHandler),
    takeLatest(GENERATE_OTP, otpHandler),
    takeLatest(LOGOUT, logoutHandler),
    takeLatest([LOGIN_SUCCESS, FETCH_MY_PROFILE_DETAIL], fetchProfileHandler),
    takeLatest(UPDATE_PROFILE_DETAIL, updateProfileHandler),
  ]);
}

export default user;
