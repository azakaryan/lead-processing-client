export interface JWTData {
  accessToken: string;
  idToken: string;
  expiresIn: string;
  tokenType: string;
}

export const getJwtInfo = (token: string) => {
  if (!token) {
    return;
  }

  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

export const getJwtData = (token: string): JWTData | null => {
  if (!token) {
    return null;
  }

  const jwtParams = new URLSearchParams(token);

  return {
    accessToken: jwtParams.get('access_token')!,
    idToken: jwtParams.get('id_token')!,
    expiresIn: jwtParams.get('expires_in')!,
    tokenType: jwtParams.get('token_type')!,
  };
}