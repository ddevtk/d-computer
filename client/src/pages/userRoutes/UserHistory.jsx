import { Col, Row } from 'antd';
import React from 'react';
import UserNav from '../../components/UserNav';

const UserHistory = () => {
  return (
    <Row
      style={{
        padding: '1.5rem 0',
        backgroundColor: 'rgb(245, 248, 253)',
        minHeight: '90vh',
      }}
    >
      <UserNav selectedKey='history' />
      <Col
        sm={24}
        xs={24}
        md={20}
        style={{ padding: '0 24px', minHeight: 280 }}
      >
        Content
      </Col>
    </Row>
  );
};

export default UserHistory;
