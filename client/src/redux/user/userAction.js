import * as api from '../../api/authApi';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { googleAuthProvider } from '../../firebase/firebase.utils';

import { userActionType } from './userType';

export const unsubscribe = () => (dispatch) => {
  const auth = getAuth();
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      try {
        const idToken = await user.getIdToken();
        const { data } = await api.currentUser(idToken);

        const { name, email, _id, role, avatar } = data;

        dispatch({
          type: userActionType.LOGGED_IN_SUCCESS,
          payload: { _id, name, email, token: idToken, role, avatar },
        });
      } catch (error) {
        console.error(error);
      }
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
  (emailIp, passwordIp) => async (dispatch) => {
    dispatch({ type: userActionType.LOGGED_IN_INIT });
    const auth = getAuth();
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        emailIp,
        passwordIp
      );
      const idToken = await user.getIdToken();

      const { data } = await api.createOrUpdateUser(idToken);
      const { name, email, _id, role, avatar } = data;

      dispatch({
        type: userActionType.LOGGED_IN_SUCCESS,
        payload: { _id, name, email, token: idToken, role, avatar },
      });
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
    const token = await result.user.getIdToken();
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    const {
      data: { _id, name, email, role, avatar },
    } = await api.createOrUpdateUser(token);
    dispatch({
      type: userActionType.LOGGED_IN_SUCCESS,
      payload: { _id, name, email, role, token, avatar },
    });
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
