import { AuthData } from "../reducers/authReducer";

export const signIn = (authData: AuthData) => {
  return {
    type: "SIGN_IN",
    data: authData,
  };
}

export const signOut = () => {
  return {
    type: "SIGN_OUT",
    data: null,
  };
}