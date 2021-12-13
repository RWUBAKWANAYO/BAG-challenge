/* eslint-disable import/named */
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
} from '../actionTypes';

const initialState = {
  loading: false,
  response: [],
  success: false,
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_USER_SUCCESS:
      return {
        loading: false,
        response: action.payload,
        success: true,
        error: '',
      };

    case LOGIN_USER_FAILURE:
      return {
        loading: false,
        response: [],
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
