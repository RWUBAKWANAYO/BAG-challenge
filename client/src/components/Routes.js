import ReactGa from 'react-ga';
import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { handleTheme } from '../redux';
import '../App.scss';
import Landing from './landing/Landing';
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import MyList from './mylist/MyList';
import Details from './details/Details';
import {
  UserRequiresAuthentication,
  UserRequiresNoAuthentication,
} from '../middleware/authenticate.user';
// component which wrapper all app routes
const Routes = () => {
  useEffect(() => {
    ReactGa.initialize('UA-163119480-1');
    ReactGa.pageview(window.location.pathname);
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={UserRequiresAuthentication(Landing)} />
        <Route exact path="/login" component={UserRequiresNoAuthentication(Signin)} />
        <Route exact path="/register" component={UserRequiresNoAuthentication(Signup)} />
        <Route exact path="/mylist" component={UserRequiresAuthentication(MyList)} />
        <Route exact path="/details/:CountryName" component={UserRequiresAuthentication(Details)} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
