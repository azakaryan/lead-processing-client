import React from 'react';
import { removeAuthData } from '../shared/utils/localStorage.util';
import { navigateLogout } from '../shared/utils/navigation.util';

const {
  REACT_APP_AUTH_ENDPOINT,
  REACT_APP_AUTH_CLIENT_ID,
  REACT_APP_AUTH_REDIRECT_URI,
} = process.env

class SignOut extends React.Component {

  render() {
    const signOutUrl = `${REACT_APP_AUTH_ENDPOINT}/logout?` +
                       `client_id=${REACT_APP_AUTH_CLIENT_ID}` +
                       `&logout_uri=${REACT_APP_AUTH_REDIRECT_URI}/`;                 
    
    removeAuthData();
    navigateLogout(signOutUrl)

    return (
      <div></div>
    );  
  }
}

export default SignOut;