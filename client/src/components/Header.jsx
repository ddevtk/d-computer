import React, { useState } from 'react';
import {
  HomeOutlined,
  UserOutlined,
  UserDeleteOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/user/userAction';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
  const [current, setCurrent] = useState('home');
  const { Item, SubMenu } = Menu;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const handleClick = (e) => {
    setCurrent(e.key);
  };
  const logoutHandler = () => {
    dispatch(logout()).then(() => {
      navigate('/login');
    });
  };
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
      <Item
        key='home'
        icon={<HomeOutlined />}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Link to='/'>Trang chủ</Link>
      </Item>

      {!user && (
        <Item
          key='login'
          icon={<UserOutlined />}
          style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}
        >
          <Link to='/login'>Đăng nhập</Link>
        </Item>
      )}
      {user && (
        <SubMenu
          key='username'
          title={user.name}
          icon={<UserOutlined />}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: 'auto',
          }}
        >
          {user && user.role === 'subscriber' && (
            <Item
              icon={<AppstoreOutlined />}
              key='history'
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Link to='/user/history'>History</Link>
            </Item>
          )}
          {user && user.role === 'admin' && (
            <Item
              icon={<AppstoreOutlined />}
              key='admin'
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Link to='/admin/dashboard'>Dashboard</Link>
            </Item>
          )}
          <Item
            key='logout'
            icon={<UserDeleteOutlined />}
            onClick={logoutHandler}
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Đăng xuất
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
