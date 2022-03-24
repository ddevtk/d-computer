import { Col, Row } from 'antd';
import React from 'react';
import AdminNav from '../../components/AdminNav';

const AdminDashboard = () => {
  return (
    <Row
      style={{
        padding: '1.5rem 0',
        backgroundColor: 'rgb(245, 248, 253)',
        minHeight: '90vh',
      }}
    >
      <AdminNav selectedKey='dashboard' />
      <Col
        sm={24}
        xs={24}
        md={20}
        style={{ padding: '0 24px', minHeight: 280 }}
      >
        Admin dashboard
      </Col>
    </Row>
  );
};

export default AdminDashboard;
