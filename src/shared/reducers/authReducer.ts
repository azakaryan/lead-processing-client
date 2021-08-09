import { JWTData } from '../utils';
import { getAuthData } from '../utils/localStorage.util';

export type AuthData = {
  isAdmin: boolean,
  username: string,
  jwtData: JWTData,
};

interface IState {
  isSignedIn: boolean | null;
  data: AuthData | null;
}


const localAuthData = getAuthData() || null;
const INITIAL_STATE: IState = {
  isSignedIn: !!localAuthData,
  data: localAuthData
};

export const authReducer = (state = INITIAL_STATE, action: { type: string, data: AuthData }): IState => {
  switch (action.type) {
    case 'SIGN_IN':
      return { ...state, isSignedIn: true, data: action.data };
    case 'SIGN_OUT':
      return { ...state, isSignedIn: true, data: null };
    default:
      return state;
  }
}