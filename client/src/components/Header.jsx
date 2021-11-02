import React, { useState } from 'react';
import { HomeOutlined, UserOutlined, UserAddOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const Header = () => {
  const [current, setCurrent] = useState('home');
  const { Item } = Menu;

  const handleClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
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
