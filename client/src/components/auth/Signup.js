import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../../redux';
import { Loader } from '../loader/Loader';

export default function Signup() {
  const dispatch = useDispatch();
  const [WaitingLoader, setWaitingLoader] = useState(false);
  const ActiveTheme = useSelector((state) => state.ActiveTheme);
  const [loginInfo, setLoginInfo] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone_number: '',
    date_of_birth: '',
    country: '',
  });
  const HandleRegister = (e) => {
    e.preventDefault();
    setWaitingLoader(true);
    dispatch(registerUser({ loginInfo }));
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <form onSubmit={(e) => HandleRegister(e)}>
          <div className="auth-link-wrapper">
            <Link to="/login"><h3 id="auth-deactive2">SignIn</h3></Link>
            <h3 id="auth-active">SignUp</h3>
          </div>
          <div className="auth-text-wrapper">
            <label>First Name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              required
              onChange={(e) => setLoginInfo({ ...loginInfo, first_name: e.target.value })}
            />
          </div>
          <div className="auth-text-wrapper">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              required
              onChange={(e) => setLoginInfo({ ...loginInfo, last_name: e.target.value })}
            />
          </div>
          <div className="auth-text-wrapper">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })}
            />
          </div>
          <div className="auth-text-wrapper">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
            />
          </div>
          <div className="auth-text-wrapper">
            <label>Phone Number</label>
            <input
              type="number"
              placeholder="Enter your phone number"
              required
              onChange={(e) => setLoginInfo({ ...loginInfo, phone_number: e.target.value })}
            />
          </div>
          <div className="auth-text-wrapper">
            <label>Date Of Birth</label>
            <input
              type="date"
              placeholder="Enter your date of birth"
              required
              onChange={(e) => setLoginInfo({ ...loginInfo, date_of_birth: e.target.value })}
            />
          </div>
          <div className="auth-text-wrapper">
            <label>Country</label>
            <input
              type="text"
              placeholder="Name of your country"
              required
              onChange={(e) => setLoginInfo({ ...loginInfo, country: e.target.value })}
            />
          </div>
          <button type="submit" className="auth-submit-button">REGISTER</button>
          <br />
          <br />
        </form>
      </div>
      {WaitingLoader && (
      <div className="auth-loader-wrapper" style={{ backgroundColor: `${ActiveTheme.LoaderColor}` }}>
        <Loader />
      </div>
      )}
    </div>
  );
}
