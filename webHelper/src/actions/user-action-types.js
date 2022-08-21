import { createAction } from 'redux-actions';

export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const changePassword = createAction(CHANGE_PASSWORD);

export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE';
export const changePasswordFailure = createAction(CHANGE_PASSWORD_FAILURE);

export const CHANGE_PASSWORD_REQUESTED = 'CHANGE_PASSWORD_REQUESTED';
export const changePasswordRequested = createAction(CHANGE_PASSWORD_REQUESTED);

export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const changePasswordSuccess = createAction(CHANGE_PASSWORD_SUCCESS);

export const LOGIN = 'LOGIN';
export const login = createAction(LOGIN);

export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const loginFailure = createAction(LOGIN_FAILURE);

export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const loginRequested = createAction(LOGIN_REQUESTED);

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = createAction(LOGIN_SUCCESS);

export const GENERATE_OTP = 'GENERATE OTP';
export const genearteOtp = createAction(GENERATE_OTP);

export const GENERATE_OTP_FAILURE = 'GENERATE_OTP_FAILURE';
export const genearteOtpfailure = createAction(GENERATE_OTP_FAILURE);

export const GENERATE_OTP_REQUESTED = 'GENERATE_OTP_REQUESTED';
export const generateOtpRequested = createAction(GENERATE_OTP_REQUESTED);

export const GENERATE_OTP_SUCCESS = 'GENERATE_OTP_SUCCESS';
export const generateOtpSuccess = createAction(GENERATE_OTP_SUCCESS);

export const LOGOUT = 'LOGOUT';
export const logout = createAction(LOGOUT);

export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const logoutFailure = createAction(LOGOUT_FAILURE);

export const LOGOUT_REQUESTED = 'LOGOUT_REQUESTED';
export const logoutRequested = createAction(LOGOUT_REQUESTED);

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const logoutSuccess = createAction(LOGOUT_SUCCESS);

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const forgotPassword = createAction(FORGOT_PASSWORD);

export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';
export const forgotPasswordFailure = createAction(FORGOT_PASSWORD_FAILURE);

export const FORGOT_PASSWORD_REQUESTED = 'FORGOT_PASSWORD_REQUESTED';
export const forgotPasswordRequested = createAction(FORGOT_PASSWORD_REQUESTED);

export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const forgotPasswordSuccess = createAction(FORGOT_PASSWORD_SUCCESS);

export const FETCH_MY_PROFILE_DETAIL = 'FETCH_MY_PROFILE_DETAIL';
export const fetchMyProfileDetail = createAction(FETCH_MY_PROFILE_DETAIL);

export const FETCH_MY_PROFILE_DETAIL_FAILURE = 'FETCH_MY_PROFILE_DETAIL_FAILURE';
export const fetchMyProfileDetailFailure = createAction(FETCH_MY_PROFILE_DETAIL_FAILURE);

export const FETCH_MY_PROFILE_DETAIL_REQUESTED = 'FETCH_MY_PROFILE_DETAIL_REQUESTED';
export const fetchMyProfileDetailRequested = createAction(FETCH_MY_PROFILE_DETAIL_REQUESTED);

export const FETCH_MY_PROFILE_DETAIL_SUCCESS = 'FETCH_MY_PROFILE_DETAIL_SUCCESS';
export const fetchMyProfileDetailSuccess = createAction(FETCH_MY_PROFILE_DETAIL_SUCCESS);

export const UPDATE_PROFILE_DETAIL = 'UPDATE_PROFILE_DETAIL';
export const updateProfileDetail = createAction(UPDATE_PROFILE_DETAIL);

export const UPDATE_PROFILE_DETAIL_FAILURE = 'UPDATE_PROFILE_DETAIL_FAILURE';
export const updateProfileDetailFailure = createAction(UPDATE_PROFILE_DETAIL_FAILURE);

export const UPDATE_PROFILE_DETAIL_REQUESTED = 'UPDATE_PROFILE_DETAIL_REQUESTED';
export const updateProfileDetailRequested = createAction(UPDATE_PROFILE_DETAIL_REQUESTED);

export const UPDATE_PROFILE_DETAIL_SUCCESS = 'UPDATE_PROFILE_DETAIL_SUCCESS';
export const updateProfileDetailSuccess = createAction(UPDATE_PROFILE_DETAIL_SUCCESS);


