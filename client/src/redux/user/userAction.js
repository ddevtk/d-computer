import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  facebookAuthProvider,
  googleAuthProvider,
} from '../../firebase/firebase.utils';

import { userActionType } from './userType';

export const unsubscribe = () => (dispatch) => {
  const auth = getAuth();
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      console.log('User is signed in');
      dispatch({
        type: userActionType.AUTH_SUCCESS,
        payload: user,
      });
    } else {
      console.log('User is not signed in');
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

export const register = (user) => (dispatch) => {
  dispatch({ type: userActionType.REGISTER_SUCCESS, payload: user });
};

export const loginWithEmailAndPassword =
  (email, password) => async (dispatch) => {
    dispatch({ type: userActionType.LOGGED_IN_INIT });
    const auth = getAuth();
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      dispatch({ type: userActionType.LOGGED_IN_SUCCESS, payload: user });
    } catch (error) {
      dispatch({
        type: userActionType.LOGGED_IN_ERROR,
        payload: error.message,
      });
      setTimeout(() => {
        dispatch({
          type: userActionType.CLEAN_STATE,
        });
      }, 2000);
    }
  };
export const loginWithGoogle = () => async (dispatch) => {
  const auth = getAuth();
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    console.log(result);
    console.log(await result.user.getIdToken());
    const credential = GoogleAuthProvider.credentialFromResult(result);
    console.log(credential);
    dispatch({ type: userActionType.LOGGED_IN_SUCCESS, payload: result.user });
  } catch (error) {
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(credential);
  }
};
// export const loginWithFacebook = () => async (dispatch) => {
//   const auth = getAuth();
//   try {
//     const result = await signInWithPopup(auth, facebookAuthProvider);
//     const credential = FacebookAuthProvider.credentialFromResult(result);
//     console.log(result);
//     console.log(credential);
//     // dispatch({ type: userActionType.LOGGED_IN_SUCCESS, payload: result.user });
//   } catch (error) {
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     console.log(credential);
//   }
// };
