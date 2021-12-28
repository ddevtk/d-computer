import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete';
import Home from './pages/Home';
import { unsubscribe } from './redux/user/userAction';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(unsubscribe());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/register/complete' element={<RegisterComplete />} />
      </Routes>
    </>
  );
};

export default App;
