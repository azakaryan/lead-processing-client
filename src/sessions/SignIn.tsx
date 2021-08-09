import { useEffect } from 'react';

const {
  REACT_APP_AUTH_ENDPOINT,
  REACT_APP_AUTH_CLIENT_ID,
  REACT_APP_AUTH_REDIRECT_URI,
} = process.env
const SIGNIN_SUCCESS_REDIRECT = 'sessions/signin-success-redirect';

const SignIn = () => {
  const loginUrl = `${REACT_APP_AUTH_ENDPOINT}/login?` +
                    `client_id=${REACT_APP_AUTH_CLIENT_ID}` +
                    `&response_type=token&scope=openid` +
                    `&redirect_uri=${REACT_APP_AUTH_REDIRECT_URI}/${SIGNIN_SUCCESS_REDIRECT}`;

  useEffect(() => {
    window.location.replace(loginUrl); 
  });

  return (
    <div>
      Please, wait redirecting to signin...
    </div>
  );

}

export default SignIn;