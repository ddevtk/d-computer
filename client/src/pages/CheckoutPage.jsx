import { Badge, Button, Col, Input, notification, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import * as cartApi from '../api/cartApi';
import { formatPrice } from '../utils/formatPrice';
import { useCookies } from 'react-cookie';

const CheckoutPage = () => {
  const [productCart, setProductCart] = useState([]);
  const [total, setTotal] = useState('');
  const [loading, setLoading] = useState(true);
  const [maGiamGia, setMaGiamGia] = useState('');

  const [cookies] = useCookies();
  const { user } = cookies;

  useEffect(() => {
    setLoading(true);
    cartApi
      .getUserCart(user.token)
      .then((res) => {
        setTotal(res.data.total);
        setProductCart(res.data.products);
        setTimeout(() => {
          setLoading(false);
        }, 100);
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
          duration: 10,
        });
        setLoading(false);
      });
  }, [user.token]);

  return (
    <Row style={{ padding: '2rem', minHeight: '90vh' }}>
      <Col md={12} lg={12} sm={24} xs={24}>
        <h4>Thông tin giao hàng</h4>
      </Col>
      <Col md={12} lg={12} sm={24} xs={24}>
        {!loading &&
          productCart.length !== 0 &&
          productCart?.map((item, id) => {
            return (
              <Row
                key={id}
                align='middle'
                style={{
                  padding: '5px',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.09)',
                }}
              >
                <Col
                  style={{ flex: '1 1 0', padding: '0.5rem', margin: 'auto' }}
                >
                  <Badge count={item.count}>
                    <img
                      style={{ width: '100%', height: '100%' }}
                      src={item.product.images[0].url}
                      alt={item.product.title}
                    />
                  </Badge>
                </Col>
                <Col style={{ flex: '5 1 0', padding: '0.5rem' }}>
                  <Row justify='space-between' align='middle'>
                    <Col style={{ flex: '4 1 0' }}>
                      <span
                        style={{
                          fontSize: '0.8rem',
                          display: 'block',
                          width: '90%',
                        }}
                      >
                        {item.product.title}
                      </span>
                    </Col>
                    <Col style={{ flex: '1 1 0', fontWeight: 'bold' }}>
                      {formatPrice(item.count * item.product.price)}
                    </Col>
                  </Row>
                </Col>
              </Row>
            );
          })}
        <Row
          justify='space-between'
          style={{
            padding: '1rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.09)',
          }}
        >
          <Input
            value={maGiamGia}
            onChange={(e) => setMaGiamGia(e.target.value)}
            placeholder='Nhập mã giảm giá (nếu có)'
            style={{ width: '70%' }}
          />
          <Button style={{ width: '20%' }} type='primary' danger>
            Sử dụng
          </Button>
        </Row>
        <Row align='middle' justify='space-between' className='mt-4'>
          <span>Tổng cộng</span>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            {formatPrice(total)}
          </span>
        </Row>
      </Col>
    </Row>
  );
};

export default CheckoutPage;
