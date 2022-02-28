import React from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import AdminNav from '../../components/AdminNav';

const SubCategory = () => {
  return (
    <Layout
      style={{ padding: '24px 0', background: '#fff', flexDirection: 'row' }}
    >
      <AdminNav selectedKey='sub' />
      <Content style={{ padding: '0 24px', minHeight: 280 }}>
        Danh mục con
      </Content>
    </Layout>
  );
};

export default SubCategory;
