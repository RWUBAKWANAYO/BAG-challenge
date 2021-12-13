// import ServerUrl from '../../base_url/ServerUrl';
import axios from 'axios';
import { fetchUserProfile } from './UserProfileAction';
import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
} from '../actionTypes';

const registerUserRequest = () => ({ type: REGISTER_USER_REQUEST });
const registerUserSuccess = (informations) => ({
  type: REGISTER_USER_SUCCESS,
  payload: informations,
});

const registerUserFailure = (error) => ({
  type: REGISTER_USER_FAILURE,
  payload: error,
});

export const registerUser = (info) => (dispatch) => {
  dispatch(registerUserRequest());

  axios
    .post('http://localhost:5000/api/auth/register', info.loginInfo)
    .then((response) => {
      const informations = response.data;
      localStorage.setItem('token', informations.token);
      dispatch(registerUserSuccess(informations));
      dispatch(fetchUserProfile(informations.token));
    })
    .catch((error) => {
      const errorMsg = error.response.data.error;
      dispatch(registerUserFailure(errorMsg));
    });
};
