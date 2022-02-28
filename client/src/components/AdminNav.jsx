import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const AdminNav = ({ selectedKey }) => {
  return (
    <Menu
      defaultSelectedKeys={selectedKey}
      mode='inline'
      style={{ maxWidth: '12rem' }}
    >
      <Menu.Item key='dashboard'>
        <Link to='/admin/dashboard'>Dashboard</Link>
      </Menu.Item>
      <Menu.Item key='products'>
        <Link to='/admin/products'>Sản phẩm</Link>
      </Menu.Item>
      <Menu.Item key='categories'>
        <Link to='/admin/categories'>Danh mục</Link>
      </Menu.Item>
      <Menu.Item key='sub'>
        <Link to='/admin/sub'>Danh mục con</Link>
      </Menu.Item>
      <Menu.Item key='coupon'>
        <Link to='/admin/coupon'>Giảm giá</Link>
      </Menu.Item>
      <Menu.Item key='password'>
        <Link to='/admin/password'>Mật khẩu</Link>
      </Menu.Item>
    </Menu>
  );
};

export default AdminNav;
