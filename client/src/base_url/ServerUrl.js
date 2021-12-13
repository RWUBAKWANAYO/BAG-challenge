/* eslint-disable linebreak-style */
import axios from 'axios';

export default axios.create({ serverURL: process.env.REACT_APP_SERVER_URL });
