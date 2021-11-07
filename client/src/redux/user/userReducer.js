import { userActionType } from './userType';

export const userReducer = (state = null, action) => {
  switch (action.type) {
    case userActionType.LOGGED_IN_USER:
      return action.payload;
    case userActionType.LOGOUT:
      return action.payload;
    default:
      return state;
  }
};
