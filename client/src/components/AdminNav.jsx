import { Button, Menu } from 'antd';
import React from 'react';
import {
  MenuUnfoldOutlined,
  TableOutlined,
  MenuFoldOutlined,
  DatabaseOutlined,
  AppstoreOutlined,
  IdcardOutlined,
  LaptopOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const AdminNav = ({ selectedKey }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
      }}
    >
      <Button
        type='primary'
        style={{ marginBottom: 16 }}
        onClick={toggleCollapsed}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        inlineCollapsed={collapsed}
        defaultSelectedKeys={selectedKey}
        mode='inline'
        theme='light'
        style={{ maxWidth: '12rem' }}
      >
        <Menu.Item key='dashboard' icon={<AppstoreOutlined />}>
          <Link to='/admin/dashboard'>Dashboard</Link>
        </Menu.Item>
        <Menu.Item key='products' icon={<LaptopOutlined />}>
          <Link to='/admin/product'>Sản phẩm</Link>
        </Menu.Item>
        <Menu.Item key='categories' icon={<TableOutlined />}>
          <Link to='/admin/categories'>Danh mục</Link>
        </Menu.Item>
        <Menu.Item key='sub' icon={<DatabaseOutlined />}>
          <Link to='/admin/sub'>Danh mục con</Link>
        </Menu.Item>
        <Menu.Item key='coupon' icon={<IdcardOutlined />}>
          <Link to='/admin/coupon'>Giảm giá</Link>
        </Menu.Item>
        <Menu.Item key='password' icon={<UnlockOutlined />}>
          <Link to='/admin/password'>Mật khẩu</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default AdminNav;
