import { Col, Layout, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React from 'react';
import UserNav from '../../components/UserNav';

const Wishlist = () => {
  return (
    <Row
      style={{
        padding: '1.5rem 0',
        backgroundColor: 'rgb(245, 248, 253)',
        minHeight: '90vh',
      }}
    >
      <UserNav selectedKey='wishlist' />
      <Col
        sm={24}
        xs={24}
        md={20}
        style={{ padding: '0 24px', minHeight: 280 }}
      >
        My wishlist
      </Col>
    </Row>
  );
};

export default Wishlist;
