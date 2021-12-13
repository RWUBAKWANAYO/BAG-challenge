/* eslint-disable import/named */
import {
  FETCH_USER_LIST_REQUEST,
  FETCH_USER_LIST_SUCCESS,
  FETCH_USER_LIST_FAILURE,
} from '../actionTypes';

const initialState = {
  loading: false,
  response: [],
  success: false,
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_LIST_SUCCESS:
      return {
        loading: false,
        response: action.payload,
        success: true,
        error: '',
      };

    case FETCH_USER_LIST_FAILURE:
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
