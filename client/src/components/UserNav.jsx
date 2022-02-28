import { Menu } from 'antd';

import React from 'react';
import { Link } from 'react-router-dom';

const UserNav = ({ selectedKey }) => {
  return (
    <Menu
      defaultSelectedKeys={selectedKey}
      mode='inline'
      style={{ maxWidth: '12rem' }}
    >
      <Menu.Item key='history'>
        <Link to='/user/history'>History</Link>
      </Menu.Item>
      <Menu.Item key='change-password'>
        <Link to='/user/change-password'>Đổi mật khẩu</Link>
      </Menu.Item>
      <Menu.Item key='wishlist'>
        <Link to='/user/wishlist'>Yêu thích</Link>
      </Menu.Item>
    </Menu>
  );
};

export default UserNav;
