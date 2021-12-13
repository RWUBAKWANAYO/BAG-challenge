// import ServerUrl from '../../base_url/ServerUrl';
import axios from 'axios';
import {
  FETCH_USER_PROFILE_REQUEST,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAILURE,
  SET_USER_TOKEN
} from '../actionTypes';

const fetchUserProfileRequest = () => ({ type: FETCH_USER_PROFILE_REQUEST });
const fetchUserProfileSuccess = (informations) => ({
  type: FETCH_USER_PROFILE_SUCCESS,
  payload: informations,
});

export const setUserToken = (info) => ({
  type: SET_USER_TOKEN,
  payload: info,
});

const fetchUserProfileFailure = (error) => ({
  type: FETCH_USER_PROFILE_FAILURE,
  payload: error,
});

export const fetchUserProfile = () => (dispatch) => {
  dispatch(fetchUserProfileRequest());
  const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, } };
  axios.get('http://localhost:5000/api/private/profile', config)
    .then((response) => {
      const informations = response.data;
      localStorage.setItem('profile', JSON.stringify(informations.data));
      dispatch(fetchUserProfileSuccess(informations));
      dispatch(setUserToken(informations.token));
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch(fetchUserProfileFailure(errorMsg));
    });
};
