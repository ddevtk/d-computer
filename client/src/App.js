import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AuthRoute from './pages/auth/AuthRoute';
import ForgotPassword from './pages/auth/ForgotPassword';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete';
import Home from './pages/Home';
import { userActionType } from './redux/user/userType';
// import { unsubscribe } from './redux/user/userAction';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(unsubscribe());
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in');
        dispatch({
          type: userActionType.LOGGED_IN_SUCCESS,
          payload: user,
        });
      } else {
        console.log('user not signed in');
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<AuthRoute />}>
          <Route path='/login' element={<Login />} />
        </Route>
        <Route path='/register' element={<AuthRoute />}>
          <Route path='/register' element={<Register />} />
        </Route>
        <Route path='/register/complete' element={<AuthRoute />}>
          <Route path='/register/complete' element={<RegisterComplete />} />
        </Route>
        <Route path='/forgot-password' element={<AuthRoute />}>
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
