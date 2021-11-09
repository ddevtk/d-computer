import React, { useState } from 'react';
import {
  HomeOutlined,
  UserOutlined,
  UserAddOutlined,
  SettingOutlined,
  UserDeleteOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/user/userAction';
import { useDispatch } from 'react-redux';

const Header = () => {
  const [current, setCurrent] = useState('home');
  const { Item, SubMenu } = Menu;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (e) => {
    setCurrent(e.key);
  };
  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
      <Item
        key='home'
        icon={<HomeOutlined />}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Link to='/'>Home</Link>
      </Item>
      <SubMenu key='username' icon={<SettingOutlined />} title='Username'>
        <Item key='setting:1'>Option1</Item>
        <Item key='setting:2'>Option2</Item>
        <Item
          key='logout'
          icon={<UserDeleteOutlined />}
          style={{ display: 'flex', alignItems: 'center' }}
          onClick={logoutHandler}
        >
          Logout
        </Item>
      </SubMenu>

      <Item
        key='login'
        icon={<UserOutlined />}
        style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}
      >
        <Link to='/login'>Login</Link>
      </Item>
      <Item
        key='register'
        icon={<UserAddOutlined />}
        style={{ float: 'right', display: 'flex', alignItems: 'center' }}
      >
        <Link to='/register'>Register</Link>
      </Item>
    </Menu>
  );
};

export default Header;
