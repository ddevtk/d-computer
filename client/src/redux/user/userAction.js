import { getAuth, signOut } from 'firebase/auth';
import { userActionType } from './userType';

export const unsubscribe = () => (dispatch) => {
  const auth = getAuth();
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
  try {
    await signOut(auth);
    dispatch({
      type: userActionType.LOGOUT,
      payload: null,
    });
  } catch (error) {}
};
