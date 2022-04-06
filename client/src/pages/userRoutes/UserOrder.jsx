import { Button, Col, Row, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import UserNav from '../../components/UserNav';
import * as userApi from '../../api/userApi';
import { useCookies } from 'react-cookie';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';

const UserOrder = () => {
  const [cookie] = useCookies(['user']);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const loadUserOrders = async () => {
    try {
      setLoading(true);
      const { data } = await userApi.getUserOrders(cookie.user.token);
      setProducts(
        data
          .filter((el) => el._id === params.id)[0]
          .products.map((item) => {
            const { _id, title, color, brand, price, slug } = item.product;
            return {
              key: _id,
              price: price,
              title: title,
              color: color,
              brand: brand,
              count: item.count,
              slug: slug,
            };
          })
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  };
  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Link className='hover-link' to={`/${record.slug}`}>
          {text}
        </Link>
      ),
    },
    {
      title: 'Giá tiền',
      dataIndex: 'price',
      key: 'price',
      render: (text) => formatPrice(text),
    },
    { title: 'Số lương', dataIndex: 'count', key: 'count' },
    { title: 'Màu', dataIndex: 'color', key: 'color' },
    { title: 'Thương hiệu', dataIndex: 'brand', key: 'brand' },
  ];

  useEffect(() => {
    loadUserOrders();
  }, [params]);

  return (
    <Row
      style={{
        padding: '1.5rem 0',
        backgroundColor: 'rgb(245, 248, 253)',
        minHeight: '90vh',
      }}
    >
      <UserNav />
      <Col
        sm={24}
        xs={24}
        md={20}
        style={{ padding: '0 24px', minHeight: 280 }}
      >
        <Button className='mb-4' type='primary'>
          <Link
            style={{ display: 'flex', alignItems: 'center' }}
            to='/user/history'
          >
            <ArrowLeftOutlined />
            Quay laị đơn hàng
          </Link>
        </Button>
        <Table
          columns={columns}
          dataSource={products}
          scroll={{ x: 450 }}
          loading={loading}
          pagination={{ pageSize: 10, position: ['bottomCenter'] }}
        />
      </Col>
    </Row>
  );
};

export default UserOrder;
