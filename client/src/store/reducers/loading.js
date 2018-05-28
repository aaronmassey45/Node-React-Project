import * as Actions from '../actions/actionTypes';

export default (state = null, action) => {
  switch (action.type) {
    case Actions.REQUEST:
      return true;
    case !Actions.REQUEST:
    default:
      return false;
  }
};
