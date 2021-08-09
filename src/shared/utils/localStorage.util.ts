import { AuthData } from "../reducers";

const jwtKeyName = "LEAD_PROCESSING_APP_JWT";

export const getAuthData = (): AuthData => {
  const data = window.localStorage.getItem(jwtKeyName);
  return data
    ? JSON.parse(data)
    : null;
}

export const setAuthData = (authData: AuthData) => {
  window.localStorage.setItem(jwtKeyName, JSON.stringify(authData));
}

export const removeAuthData = () => {
  window.localStorage.removeItem(jwtKeyName);
}