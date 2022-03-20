import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React from 'react';
import AdminNav from '../../components/AdminNav';

const Coupon = () => {
  return (
    <Layout
      style={{
        padding: '1.5rem 0',
        backgroundColor: 'rgb(245, 248, 253)',
        flexDirection: 'row',
        minHeight: '90vh',
      }}
    >
      <AdminNav selectedKey='coupon' />
      <Content style={{ padding: '0 24px', minHeight: 280 }}>giảm giá</Content>
    </Layout>
  );
};

export default Coupon;
