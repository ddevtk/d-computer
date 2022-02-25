import { Button, Result } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import Page403 from '../Page403';

const UserRoute = () => {
  const { user } = useSelector((state) => state.user);
  return user && user.token ? <Outlet /> : <Page403 />;
};

export default UserRoute;
