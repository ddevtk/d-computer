import { Col, Row, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import UserNav from '../../components/UserNav';
import * as userApi from '../../api/userApi';
import { useCookies } from 'react-cookie';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';

const UserHistory = () => {
  const [cookie] = useCookies(['user']);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadUserOrders = async () => {
    try {
      setLoading(true);
      const { data } = await userApi.getUserOrders(cookie.user.token);

      setOrders(
        data.map((item) => {
          return {
            key: item._id,
            orderId: item._id,
            total: _.sumBy(item.products, (p) => p.count * p.product.price),
            method: item.paymentIntent.payment_method_types[0],
            status: item.paymentIntent.status,
            createdAt: moment(item.paymentIntent.created * 1000).format(
              'DD/MM/YYYY, HH:mm:ss'
            ),
            orderStatus: item.orderStatus,
          };
        })
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  };
  const orderColumns = [
    {
      title: 'Mã đơn',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (text, record) => {
        return <Link to={`/user/order/${record.orderId}`}>{text}</Link>;
      },
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      key: 'total',
      render: (text) => formatPrice(text),
    },
    { title: 'Payment method', dataIndex: 'method', key: 'method' },
    { title: 'Payment status', dataIndex: 'status', key: 'status' },
    { title: 'Ngay thanh toan', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Order status', dataIndex: 'orderStatus', key: 'orderStatus' },
  ];

  useEffect(() => {
    loadUserOrders();
  }, []);

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
        <Table
          size='middle'
          columns={orderColumns}
          dataSource={orders}
          scroll={{ x: 450 }}
          loading={loading}
          // pagination={{
          //   position: ['bottomCenter'],
          //   pageSize: 5,
          // }}
        />
      </Col>
    </Row>
  );
};

export default UserHistory;
