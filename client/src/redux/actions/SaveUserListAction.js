// import ServerUrl from '../../base_url/ServerUrl';
import axios from 'axios';
import {
  SAVE_USER_LIST_REQUEST,
  SAVE_USER_LIST_SUCCESS,
  SAVE_USER_LIST_FAILURE,
} from '../actionTypes';

const UserListRequest = () => ({ type: SAVE_USER_LIST_REQUEST });
const UserListSuccess = (informations) => ({
  type: SAVE_USER_LIST_SUCCESS,
  payload: informations,
});

const UserListFailure = (error) => ({
  type: SAVE_USER_LIST_FAILURE,
  payload: error,
});

export const saveUserList = (info) => (dispatch) => {
  dispatch(UserListRequest());
  const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, } };
  axios
    .post('http://localhost:5000/api/private/createlist', info, config)
    .then((response) => {
      const informations = response.data;
      dispatch(UserListSuccess(informations));
    })
    .catch((error) => {
      const errorMsg = error.response;
      dispatch(UserListFailure(errorMsg));
    });
};
