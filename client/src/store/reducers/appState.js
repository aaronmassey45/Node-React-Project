import { LOGIN_SUCCESS } from '../actions/loginActions';

const INITIAL_STATE = {
  loggedIn: false
};

const appState = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return { ...state, loggedIn: true };
    default:
      return state;
  }
};

export default appState;
