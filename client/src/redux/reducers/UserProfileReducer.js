/* eslint-disable import/named */
import {
  FETCH_USER_PROFILE_REQUEST,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAILURE,
  SET_USER_TOKEN
} from '../actionTypes';

const persistedToken = localStorage.getItem('token');
const persistedUser = localStorage.getItem('profile');

const initialState = {
  loading: false,
  success: false,
  error: '',
  informations: persistedUser ? JSON.parse(persistedUser) : {},
  token: persistedToken,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_PROFILE_SUCCESS:
      return {
        loading: false,
        infomations: action.payload,
        success: true,
        error: '',
      };

    case FETCH_USER_PROFILE_FAILURE:
      return {
        loading: false,
        infomations: [],
        success: false,
        error: action.payload,
      };
    case SET_USER_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
