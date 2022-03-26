import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AuthRoute = () => {
  const { user } = useSelector((state) => state.user);

  const location = useLocation();

  if (user && location?.state?.from === 'cart') {
    return <Navigate to='/cart' />;
  }

  return !user ? (
    <Outlet />
  ) : user.role === 'admin' ? (
    <Navigate to='/admin/dashboard' />
  ) : (
    <Navigate to='/user/history' />
  );
};

export default AuthRoute;
