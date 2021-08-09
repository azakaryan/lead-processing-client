import { combineReducers } from 'redux';
import { authReducer, AuthData } from './authReducer';
export * from './authReducer';

export type AppState = {
  auth: {
    isSignedIn: boolean,
    data: AuthData,
  }
}

export default combineReducers({
  auth: authReducer,
});