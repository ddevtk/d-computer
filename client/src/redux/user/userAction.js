import { auth } from '../../firebase/firebase.utils';
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
