import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React from 'react';
import UserNav from '../../components/UserNav';

const Wishlist = () => {
  return (
    <Layout
      style={{ padding: '24px 0', background: '#fff', flexDirection: 'row' }}
    >
      <UserNav selectedKey='wishlist' />
      <Content style={{ padding: '0 24px', minHeight: 280 }}>
        My wishlist
      </Content>
    </Layout>
  );
};

export default Wishlist;
