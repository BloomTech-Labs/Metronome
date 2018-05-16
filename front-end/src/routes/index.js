import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import SignUp from '../components/Signup/SignUp';
import LogIn from '../components/LogIn/LogIn';
import LandingPage from '../components/landingpage/landingpage';
import Dashboard from '../components/Dashboard/Dashboard';
import PrivateRoute from './PrivateRoute';
import Navbar from '../components/Navbar/signInSignUp';
import ClaimToken from '../components/ClaimToken/ClaimToken';
import ErrorDisplay from '../components/ErrorDisplay/ErrorDisplay';

const LoginContainer = () => (
  <div>
    <ErrorDisplay />
    <Route exact path="/" render={() => <Redirect to="/login" />} />
    <Route path="/login" component={LogIn} />
  </div>
);

const SignupContainer = () => (
  <div>
    <ErrorDisplay />
    <Route exact path="/" render={() => <Redirect to="/signup" />} />
    <Route path="/signup" component={SignUp} />
  </div>
);

const DefaultContainer = () => (
  <div>
    <Navbar />
    <ErrorDisplay />
    <Route exact path="/" component={LandingPage} />
    <Route path="/dashboard" component={PrivateRoute(Dashboard)} />
  </div>
);

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/(login)" component={LoginContainer} />
      <Route exact path="/(signup)" component={SignupContainer} />
      <Route path="/claim-token" component={ClaimToken} />
      <Route component={DefaultContainer} />
    </Switch>
  </BrowserRouter>
);

