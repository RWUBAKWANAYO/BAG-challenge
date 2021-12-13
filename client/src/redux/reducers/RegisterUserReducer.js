/* eslint-disable import/named */
import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
} from '../actionTypes';

const initialState = {
  loading: false,
  response: [],
  success: false,
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_USER_SUCCESS:
      return {
        loading: false,
        response: action.payload,
        success: true,
        error: '',
      };

    case REGISTER_USER_FAILURE:
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
