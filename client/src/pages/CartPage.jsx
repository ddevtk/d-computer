import { ShoppingCartOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  List,
  notification,
  Row,
  Tag,
  Tooltip,
} from 'antd';
import { MDBIcon } from 'mdb-react-ui-kit';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../components/Cart/CartItem';
import {
  increaseItem,
  reduceItem,
  removeItemFromCart,
} from '../redux/cart/cartAction';
import { formatPrice } from '../utils/formatPrice';

const CartPage = () => {
  const { cart, sl, isInit, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeItemHandler = (item) => {
    dispatch(removeItemFromCart(item));
  };

  const increaseItemHandler = (item) => {
    if (item.count === item.quantity) {
      return notification.error({
        message: 'Quá số lượng trong cửa hàng',
        duration: 2,
        placement: 'bottomRight',
      });
    }
    dispatch(increaseItem(item));
  };
  const reduceItemHandler = (item) => {
    dispatch(reduceItem(item));
  };

  return (
    <div className='container py-2'>
      <Row>
        <Breadcrumb style={{ padding: '16px 0' }}>
          <Link to='/'>
            <Breadcrumb.Item>TRANG CHỦ</Breadcrumb.Item>
          </Link>
          <Breadcrumb.Item>Giỏ hàng ({sl})</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <div className='header-page'>
        <h1>Giỏ hàng của bạn</h1>
        <p className='mb-4'>
          Có <span style={{ fontWeight: 'bold' }}>{sl} sản phẩm</span> trong giỏ
          hàng
        </p>
      </div>
      <Row>
        <Col lg={16} md={16} sm={24} xs={24}>
          {cart.length === 0 && (
            <div className='mt-2'>Giỏ hàng của bạn đang trống</div>
          )}
        </Col>
        <Col lg={16} md={16} sm={24} xs={24}>
          {cart.length !== 0 &&
            cart.map((item) => {
              return <CartItem item={item} />;
            })}
        </Col>
        <Col
          lg={{ span: 7, offset: 1 }}
          md={{ span: 7, offset: 1 }}
          sm={24}
          xs={24}
        >
          <div className='cart-order-total'>
            <div className='cart-order-total__item'>
              <h4>Thông tin đơn hàng</h4>
            </div>
            <Divider />
            <div className='cart-order-total__item'>
              <Row align='middle' justify='space-between'>
                Tổng tiền:{' '}
                <span
                  style={{
                    float: 'right',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: 'red',
                  }}
                >
                  {formatPrice(total)}
                </span>
              </Row>
            </div>
            <Divider />
            <div className='cart-order-total__item'>
              <Button size='large' block type='primary' danger>
                Thanh toán
              </Button>
              <Button size='large' block type='link' danger>
                <Link to='/product'>
                  <MDBIcon fas icon='reply' />
                  Tiếp tục mua hàng
                </Link>
              </Button>
            </div>
            {/* <div className='cart-order-total__item'></div> */}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;
