import {
  Badge,
  Button,
  Col,
  Form,
  Input,
  notification,
  Row,
  Skeleton,
} from 'antd';
import React, { useEffect, useState } from 'react';
import * as cartApi from '../api/cartApi';
import { formatPrice } from '../utils/formatPrice';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { unsubscribe } from '../redux/user/userAction';

const CheckoutPage = () => {
  const [productCart, setProductCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartTotal, setCartTotal] = useState(0);
  const [discount, setDiscount] = useState(null);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [applyLoading, setApplyLoading] = useState(false);
  const [maGiamGia, setMaGiamGia] = useState('');
  const { cart, sl, total } = useSelector((state) => state.cart);
  const userReducer = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [cookies, setCookie] = useCookies();
  const { user } = cookies;

  console.log(productCart);

  const saveCartToDb = async () => {
    setLoading(true);

    try {
      await cartApi.saveCart(cart, sl, total, user.token);
      const res = await cartApi.getUserCart(user.token);

      console.log(res.data);

      setCartTotal(res.data.total);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setProductCart(res.data.products);
      setTimeout(() => {
        setLoading(false);
      }, 100);
    } catch (error) {
      notification.error({
        message: error.response.data.message,
        duration: 10,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    saveCartToDb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.token, total]);

  useEffect(() => {
    setCookie(userReducer.user);
  }, [userReducer]);

  const onFinish = (values) => {
    const { name, sdt, address } = values;
    cartApi
      .capNhatThongTinNguoiMuaHang(name, sdt, address, user.token)
      .then((res) => {
        console.log(res);
        dispatch(unsubscribe());
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const applyCoupon = () => {
    setApplyLoading(true);
    cartApi
      .applyCoupon(maGiamGia.toUpperCase(), user.token)
      .then((res) => {
        setApplyLoading(false);
        console.log(res);
        setDiscount(res.data.discount);
        setTotalAfterDiscount(res.data.totalAfterDiscount);
      })
      .catch((err) => {
        setApplyLoading(false);
        notification.error({ message: err.response.data.message, duration: 3 });
      });
  };

  return (
    <Row style={{ padding: '2rem', minHeight: '90vh' }}>
      <Col style={{ padding: '0 1.5rem 0 0' }} md={12} lg={12} sm={24} xs={24}>
        <h4>Thông tin giao hàng</h4>
        <Form
          className='mt-4'
          onFinish={onFinish}
          fields={[
            { name: 'name', value: user.name },
            { name: 'sdt', value: user.sdt },
            { name: 'address', value: user.address },
          ]}
        >
          <Form.Item
            name='name'
            rules={[{ required: true, message: 'Nhập tên của bạn' }]}
          >
            <Input placeholder='Họ và tên' />
          </Form.Item>
          <Form.Item
            name='sdt'
            rules={[{ required: true, message: 'Nhập số điện thoại của bạn' }]}
          >
            <Input placeholder='Số điện thoại' />
          </Form.Item>
          <Form.Item
            name='address'
            rules={[{ required: true, message: 'Nhập địa chỉ của bạn' }]}
          >
            <Input.TextArea rows={4} placeholder='Địa chỉ' />
          </Form.Item>
          <Form.Item>
            <Button
              className='d-inline-flex align-items-center'
              type='link'
              danger
            >
              <ArrowLeftOutlined />
              Giỏ hàng
            </Button>
            <Button
              style={{ float: 'right' }}
              htmlType='submit'
              type='primary'
              danger
            >
              Hoàn tất đơn hàng
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col md={12} lg={12} sm={24} xs={24}>
        {loading && <Skeleton active></Skeleton>}
        {!loading &&
          productCart.map((item, id) => {
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
            onChange={(e) => setMaGiamGia(e.target.value.toUpperCase())}
            placeholder='Nhập mã giảm giá (nếu có)'
            style={{ width: '70%' }}
          />
          <Button
            style={{ width: '20%' }}
            type='primary'
            loading={applyLoading}
            danger
            onClick={() => {
              applyCoupon();
            }}
          >
            Sử dụng
          </Button>
        </Row>
        <Row align='middle' justify='space-between' className='mt-4'>
          <span>Tạm tính</span>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            {formatPrice(cartTotal)}
          </span>
        </Row>
        <Row
          align='middle'
          justify='space-between'
          style={{
            borderBottom: '1px solid rgba(0, 0, 0, 0.09)',
          }}
          className='py-4'
        >
          <span>Giảm giá</span>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            {!discount ? '--' : `-${discount}%`}
          </span>
        </Row>
        <Row align='middle' justify='space-between' className='mt-4'>
          <span>Tổng cộng</span>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            {formatPrice(totalAfterDiscount * 1)}
          </span>
        </Row>
      </Col>
    </Row>
  );
};

export default CheckoutPage;
