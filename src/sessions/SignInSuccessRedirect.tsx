import React from 'react';
import { Redirect } from 'react-router';
import { getJwtInfo, getJwtData, setAuthData, navigateHome, ADMIN_URI, USER_URI } from '../shared/utils';
import { signIn } from '../shared/actions';
import { connect } from 'react-redux';


class SignInSuccessRedirect extends React.Component<{signIn: Function}> {
  private redirectUrl = '';

  errorRedirect(message?: string) {
    alert(message || 'Something went wrong, Please, try again');
    navigateHome();
  }

  calculateRedirectUrl() {
    const jwt = window.location.hash?.substr(1);
    if (!jwt) return this.errorRedirect();

    const jwtInfo = getJwtInfo(jwt);
    const jwtData = getJwtData(jwt);
    const userGroups = jwtInfo['cognito:groups'];
    const username = jwtInfo['cognito:username'];

    if (!Array.isArray(userGroups) || !jwtData) return this.errorRedirect();

    if (userGroups.includes('Admins')) {
      const authData = { username, jwtData, isAdmin: true };

      setAuthData(authData);
      this.props.signIn(authData);
      
      this.redirectUrl = ADMIN_URI;
      return;
    } 
    
    if (userGroups.includes('Users')) {
      const authData = { username, jwtData, isAdmin: false };
      
      setAuthData(authData);
      this.props.signIn(authData);
      
      this.redirectUrl = USER_URI;
      return;
    }

    // User does'n have any permissions.
    this.errorRedirect("User doesn't have any permissions. Please, contact your administrator");
  };

  render() {
    this.calculateRedirectUrl();

    return (
      <Redirect push to={this.redirectUrl} />
    );  
  }
}

export default connect(null, { signIn })(SignInSuccessRedirect);