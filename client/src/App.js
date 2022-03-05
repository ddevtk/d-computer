import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AuthRoute from './pages/auth/AuthRoute';
import ForgotPassword from './pages/auth/ForgotPassword';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete';
import HomePage from './pages/HomePage';
import { unsubscribe } from './redux/user/userAction';
import UserRoute from './pages/userRoutes/UserRoute';
import AdminRoute from './pages/adminRoutes/AdminRoute';
import Wishlist from './pages/userRoutes/Wishlist';
import ChangePassword from './pages/userRoutes/ChangePassword';
import UserHistory from './pages/userRoutes/UserHistory';
import AdminDashboard from './pages/adminRoutes/AdminDashboard';
import Category from './pages/adminRoutes/Category';
import SubCategory from './pages/adminRoutes/SubCategory';
import Product from './pages/adminRoutes/Product';
import Coupon from './pages/adminRoutes/Coupon';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(unsubscribe());
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
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
        <Route path='/user/history' element={<UserRoute />}>
          <Route path='/user/history' element={<UserHistory />} />
        </Route>
        <Route path='/user/change-password' element={<UserRoute />}>
          <Route path='/user/change-password' element={<ChangePassword />} />
        </Route>
        <Route path='/user/wishlist' element={<UserRoute />}>
          <Route path='/user/wishlist' element={<Wishlist />} />
        </Route>
        <Route path='/admin/dashboard' element={<AdminRoute />}>
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
        </Route>
        <Route path='/admin/categories' element={<AdminRoute />}>
          <Route path='/admin/categories' element={<Category />} />
        </Route>
        <Route path='/admin/sub' element={<AdminRoute />}>
          <Route path='/admin/sub' element={<SubCategory />} />
        </Route>
        <Route path='/admin/products' element={<AdminRoute />}>
          <Route path='/admin/products' element={<Product />} />
        </Route>
        <Route path='/admin/coupon' element={<AdminRoute />}>
          <Route path='/admin/coupon' element={<Coupon />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
