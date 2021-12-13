// import ServerUrl from '../../base_url/ServerUrl';
import axios from 'axios';
import {
  FETCH_USER_LIST_REQUEST,
  FETCH_USER_LIST_SUCCESS,
  FETCH_USER_LIST_FAILURE,
} from '../actionTypes';

const UserListRequest = () => ({ type: FETCH_USER_LIST_REQUEST });
const UserListSuccess = (informations) => ({
  type: FETCH_USER_LIST_SUCCESS,
  payload: informations,
});

const UserListFailure = (error) => ({
  type: FETCH_USER_LIST_FAILURE,
  payload: error,
});

export const fetchUserList = () => (dispatch) => {
  dispatch(UserListRequest());
  const storageInfo = localStorage.getItem('profile');
  const userData = JSON.parse(storageInfo);
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      user_id: userData === null || userData === undefined ? '' : userData._id
    }
  };
  axios
    .get('http://localhost:5000/api/private/getlist', config)
    .then((response) => {
      const informations = response.data;
      dispatch(UserListSuccess(informations));
    })
    .catch((error) => {
      const errorMsg = error.response;
      dispatch(UserListFailure(errorMsg));
    });
};
