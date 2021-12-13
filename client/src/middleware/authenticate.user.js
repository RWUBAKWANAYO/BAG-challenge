/* eslint-disable camelcase */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-classes-per-file */
import React, { Component } from 'react';
import { connect } from 'react-redux';

export const UserRequiresAuthentication = (ComposedComponent) => {
  // If user not authenticated render out to login
  class Authentication extends Component {
    componentDidMount() {
      if (!this.props.loggedIn) {
        return this.props.history.push('/login');
      }
    }

    componentDidUpdate() {
      if (!this.props.loggedIn) {
        return this.props.history.push('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { loggedIn: !!state.GetUserProfile.token };
  }

  return connect(mapStateToProps)(Authentication);
};

export const UserRequiresNoAuthentication = (ComposedComponent) => {
  // If user authenticated render out to dashboard
  class Authentication extends Component {
    componentDidMount() {
      console.log(this.props.loggedIn);
      if (this.props.loggedIn) {
        this.props.history.push('/');
      }
    }

    componentDidUpdate() {
      if (this.props.loggedIn) {
        this.props.history.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { loggedIn: !!state.GetUserProfile.token };
  }

  return connect(mapStateToProps)(Authentication);
};
