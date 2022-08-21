import { HIDE_LOADER, SHOW_LOADER, TOGGLE_DRAWER, TOGGLE_DRAWER_MENU, USER_LOGIN_MODAL_HIDE, USER_LOGIN_MODAL } from '../actions/app-action-types';

const initialState = {
  activeDrawerMenu: null,
  drawer: 'visible',
  locale: null,
  visible: false,
  isVisible: false,
};

export default function app(state = initialState, {
  payload, type,
}) {
  switch (type) {
    case HIDE_LOADER:
      return {
        ...state,
        visible: false,
      };

    case SHOW_LOADER:
      return {
        ...state,
        visible: true,
      };

    case TOGGLE_DRAWER:
      return {
        ...state,
        drawer: payload,
      };

    case TOGGLE_DRAWER_MENU:
      return {
        ...state,
        activeDrawerMenu: payload,
      };

    case TOGGLE_DRAWER_MENU:
      return {
        ...state,
        activeDrawerMenu: payload,
      };

    case USER_LOGIN_MODAL:
      return {
        isVisible: true
      }
    case USER_LOGIN_MODAL_HIDE:
      return {
        isVisible: false
      }

    default:
      return state;
  }
}
