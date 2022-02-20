import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import axios from 'axios';
import { googleAuthProvider } from '../../firebase/firebase.utils';

import { userActionType } from './userType';

export const unsubscribe = () => (dispatch) => {
  console.log('hello');
  const auth = getAuth();
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      try {
        const idToken = await user.getIdToken();
        const { data } = await currentUser(idToken);

        const { name, email, _id, role } = data;

        dispatch({
          type: userActionType.LOGGED_IN_SUCCESS,
          payload: { _id, name, email, token: idToken, role },
        });
      } catch (error) {
        console.error(error.response.data.message);
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

export const createOrUpdateUser = async (authToken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    {},
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

export const currentUser = async (authToken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

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

      const { data } = await createOrUpdateUser(idToken);
      const { name, email, _id, role } = data;

      dispatch({
        type: userActionType.LOGGED_IN_SUCCESS,
        payload: { _id, name, email, token: idToken, role },
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
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const {
      data: { _id, name, email, role },
    } = await createOrUpdateUser(token);
    dispatch({
      type: userActionType.LOGGED_IN_SUCCESS,
      payload: { _id, name, email, role, token },
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
