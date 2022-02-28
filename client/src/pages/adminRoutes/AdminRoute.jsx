import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import * as api from '../../api/authApi';
import Page403 from '../Page403';

const AdminRoute = () => {
  const { user } = useSelector((state) => state.user);
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (user && user.token) {
      api
        .currentAdmin(user.token)
        .then((res) => {
          console.log(res);
          setOk(true);
        })
        .catch((error) => {
          console.error(error);
          setOk(false);
        });
    }
  }, [user]);

  return ok || user?.role === 'admin' ? <Outlet /> : <Page403 />;
};

export default AdminRoute;
