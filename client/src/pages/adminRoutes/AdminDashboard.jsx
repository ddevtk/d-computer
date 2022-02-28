import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React from 'react';
import AdminNav from '../../components/AdminNav';

const AdminDashboard = () => {
  return (
    <Layout
      style={{ padding: '24px 0', background: '#fff', flexDirection: 'row' }}
    >
      <AdminNav selectedKey='dashboard' />
      <Content style={{ padding: '0 24px', minHeight: 280 }}>
        Admin dashboard
      </Content>
    </Layout>
  );
};

export default AdminDashboard;
