import React from 'react';
import { Menu, Grid, Input, Dropdown, Button } from 'antd';

import {
  AppstoreOutlined,
  SearchOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from '@ant-design/icons';
import avatar from '../../images/avatar.png';

import { Link } from 'react-router-dom';

const { useBreakpoint } = Grid;

const RightMenu = ({
  search,
  onFinish,
  setSearch,
  title,
  setTitle,
  user,
  logoutHandler,
}) => {
  console.log(user);
  const { md } = useBreakpoint();

  const userMenu = (
    <Menu>
      <Menu.Item icon={<AppstoreOutlined />}>
        <Link to='/user/history'>History</Link>
      </Menu.Item>
      <Menu.Item icon={<UserDeleteOutlined />} onClick={logoutHandler}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );
  const adminMenu = (
    <Menu>
      <Menu.Item icon={<AppstoreOutlined />}>
        <Link to='/admin/dashboard'>Dashboard</Link>
      </Menu.Item>
      <Menu.Item icon={<UserDeleteOutlined />} onClick={logoutHandler}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <form
        className='d-flex justify-content-end'
        onClick={() => setSearch(true)}
        onSubmit={onFinish}
      >
        <Input
          className={`d-flex ${search ? 'search-normal' : ''}`}
          style={{
            width: '20%',
            marginRight: '0.5rem',
            borderRadius: '1rem',
          }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          size='middle'
          placeholder='Nhập nội dung tìm kiếm...'
          suffix={<SearchOutlined />}
        />
      </form>
      <div className='d-flex'>
        <Link className='text-reset me-2' to=''>
          <i className='fas fa-shopping-cart'></i>
        </Link>
        {!user && (
          <div className='d-flex'>
            <Link
              className='text-reset d-flex align-items-center'
              to='/login'
              style={{ marginLeft: '0.2rem' }}
            >
              <UserOutlined /> Đăng nhập
            </Link>
          </div>
        )}

        {user && user.role === 'subscriber' && (
          <Dropdown overlay={userMenu}>
            <div className='d-flex align-items-center'>
              <img
                src={user.avatar || avatar}
                className='rounded-circle'
                height='25'
                alt='Black and White Portrait of a Man'
                loading='lazy'
                style={{ marginRight: '0.2rem' }}
              />
              {user.name}
            </div>
          </Dropdown>
        )}
        {user && user.role === 'admin' && (
          <Dropdown overlay={adminMenu}>
            <div className='d-flex align-items-center'>
              <img
                src={user.avatar || avatar}
                className='rounded-circle'
                height='25'
                alt='Black and White Portrait of a Man'
                loading='lazy'
                style={{ marginRight: '0.2rem' }}
              />
            </div>
          </Dropdown>
        )}
      </div>
    </>
  );
};

export default RightMenu;
