/* eslint-disable import/named */
import {
  SAVE_USER_LIST_REQUEST,
  SAVE_USER_LIST_SUCCESS,
  SAVE_USER_LIST_FAILURE,
} from '../actionTypes';

const initialState = {
  loading: false,
  response: [],
  success: false,
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SAVE_USER_LIST_SUCCESS:
      return {
        loading: false,
        response: action.payload,
        success: true,
        error: '',
      };

    case SAVE_USER_LIST_FAILURE:
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
