import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux';
import { Loader } from '../loader/Loader';

export default function Signin() {
  const dispatch = useDispatch();
  const [WaitingLoader, setWaitingLoader] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const ActiveTheme = useSelector((state) => state.ActiveTheme);
  const HandleLogin = (e) => {
    e.preventDefault();
    setWaitingLoader(true);
    dispatch(loginUser({ loginInfo }));
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <form onSubmit={(e) => HandleLogin(e)}>
          <div className="auth-link-wrapper">
            <h3 id="auth-active">SignIn</h3>
            <Link to="/register"><h3 id="auth-deactive1">SignUp</h3></Link>
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
          <button type="submit" className="auth-submit-button">Login</button>
          <hr />
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
