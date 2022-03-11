import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import * as api from '../../api/authApi';
import Page403 from '../Page403';
import Loader from '../../components/Loader';

const AdminRoute = () => {
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user && user.token) {
      api
        .currentAdmin(user.token)
        .then((_res) => {
          setLoading(false);
        })
        .catch((_error) => {
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  return user?.role === 'admin' ? <Outlet /> : <Page403 />;
};

export default AdminRoute;
