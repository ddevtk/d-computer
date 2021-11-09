import { auth } from '../../firebase/firebase.utils';
import { getAuth, signOut } from 'firebase/auth';
import { userActionType } from './userType';

export const unsubscribe = () => (dispatch) => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: userActionType.LOGGED_IN_USER,
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
    }
  });
};
export const logout = () => async (dispatch) => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      dispatch({
        type: userActionType.LOGOUT,
        payload: null,
      });
    })
    .catch((error) => {
      console.error(error.message);
    });
};
