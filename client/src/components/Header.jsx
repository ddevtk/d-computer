import React, { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/user/userAction';
import { useDispatch, useSelector } from 'react-redux';
import * as categoryApi from '../api/categoryApi';
import * as subApi from '../api/subCategoryApi';

import logo from '../images/logo.png';
import { Affix, Button, Drawer } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import LeftMenu from './HeaderNav/LeftMenu';
import RightMenu from './HeaderNav/RightMenu';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuItem, setMenuItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(false);
  const [title, setTitle] = useState('');
  const [visible, setVisible] = useState(false);

  const { user } = useSelector((state) => state.user);

  const toggleDrawer = () => {
    setVisible(!visible);
  };
  const onClose = () => {
    setVisible(false);
  };

  const logoutHandler = () => {
    dispatch(logout()).then(() => {
      navigate('/login');
    });
  };

  const loadCategory = async () => {
    try {
      const subRes = await subApi.getAllSubCategories();
      const categoryRes = await categoryApi.getAllCategories();

      let subObj = subRes.data.reduce((acc, obj) => {
        let key = obj['parent']['name'];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});

      categoryRes.data.forEach((category) => {
        if (!subObj[category.name]) {
          subObj[category.name] = [];
        }
      });

      setMenuItem(Object.entries(subObj));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onFinish = (e) => {
    e.preventDefault();
    title && navigate(`/product/?title=${title.trimEnd().trimStart()}`);
    setTitle('');
  };

  useEffect(() => {
    loadCategory();
  }, []);

  return (
    <Affix>
      <nav className='menuBar'>
        <Link to='/'>
          <img
            className='logo'
            src={logo}
            height='50'
            alt='MDB Logo'
            loading='lazy'
          />
        </Link>
        <div className='d-flex justify-content-between'>
          <LeftMenu loading={loading} menuItem={menuItem} hidden={false} />
          <div
            className='rightMenu'
            style={{
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center',
            }}
          >
            <RightMenu
              onFinish={onFinish}
              search={search}
              setSearch={setSearch}
              setTitle={setTitle}
              title={title}
              user={user}
              logoutHandler={logoutHandler}
            />
          </div>
        </div>
        <Button
          onClick={toggleDrawer}
          style={{ display: 'none', float: 'right' }}
          icon={<MenuFoldOutlined />}
          type='primary'
          className='barButton'
        />
        <Drawer
          placement='right'
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <Button
            onClick={toggleDrawer}
            icon={<MenuUnfoldOutlined />}
            type='primary'
            style={{ float: 'right', display: 'block' }}
          />
          <LeftMenu hidden={true} loading={loading} menuItem={menuItem} />
          <RightMenu
            onFinish={onFinish}
            search={search}
            setSearch={setSearch}
            setTitle={setTitle}
            title={title}
            user={user}
            logoutHandler={logoutHandler}
          />
        </Drawer>
      </nav>
    </Affix>
  );
};

export default Header;
