import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoute = () => {
  const { user } = useSelector((state) => state.user);

  return !user ? (
    <Outlet />
  ) : user.role === 'admin' ? (
    <Navigate to='/admin/dashboard' />
  ) : (
    <Navigate to='/user/history' />
  );
};

export default AuthRoute;
