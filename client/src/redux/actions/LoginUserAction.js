// import ServerUrl from '../../base_url/ServerUrl';
import axios from 'axios';
import { fetchUserProfile } from './UserProfileAction';
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
} from '../actionTypes';

const loginUserRequest = () => ({ type: LOGIN_USER_REQUEST });
const loginUserSuccess = (informations) => ({
  type: LOGIN_USER_SUCCESS,
  payload: informations,
});

const loginUserFailure = (error) => ({
  type: LOGIN_USER_FAILURE,
  payload: error,
});

export const loginUser = (info) => (dispatch) => {
  dispatch(loginUserRequest());
  axios.post('http://localhost:5000/api/auth/login', info.loginInfo)
    .then((response) => {
      const informations = response.data;
      localStorage.setItem('token', informations.token);
      dispatch(fetchUserProfile(informations.token));
      dispatch(loginUserSuccess(informations));
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch(loginUserFailure(errorMsg));
    });
};
