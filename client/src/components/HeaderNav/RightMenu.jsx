import React from 'react';
import {
  Menu,
  Grid,
  Input,
  Dropdown,
  Popover,
  Tooltip,
  Alert,
  Divider,
  Card,
  Row,
  Button,
  Col,
  Tag,
  Badge,
} from 'antd';

import {
  AppstoreOutlined,
  SearchOutlined,
  UserDeleteOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import avatar from '../../images/avatar.png';

import { Link } from 'react-router-dom';

const str = 'ÁO SƠ MI BRITISH CLASSICS STRIPES 1448';

const RightMenu = ({
  search,
  onFinish,
  setSearch,
  title,
  setTitle,
  user,
  logoutHandler,
}) => {
  const userMenu = (
    <Menu>
      <Menu.Item icon={<AppstoreOutlined />}>
        <Link to='/user/history'>History</Link>
      </Menu.Item>
      <Menu.Item icon={<UserDeleteOutlined />} onClick={logoutHandler}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );
  const adminMenu = (
    <Menu>
      <Menu.Item icon={<AppstoreOutlined />}>
        <Link to='/admin/dashboard'>Dashboard</Link>
      </Menu.Item>
      <Menu.Item icon={<UserDeleteOutlined />} onClick={logoutHandler}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <form
        className='d-flex justify-content-end'
        onClick={() => setSearch(true)}
        onSubmit={onFinish}
      >
        <Input
          className={`d-flex ${search ? 'search-normal' : ''}`}
          style={{
            width: '20%',
            marginRight: '0.5rem',
            borderRadius: '1rem',
          }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          size='middle'
          placeholder='Nhập nội dung tìm kiếm...'
          prefix={<SearchOutlined />}
        />
      </form>
      <div className='d-flex align-items-center'>
        <Popover
          trigger='click'
          placement='bottomLeft'
          title={
            <div
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#f5f8fd',
                textAlign: 'center',
                border: '1px solid #e7ebec',
                borderRadius: '4px',
              }}
            >
              Giỏ hàng
            </div>
          }
          content={
            <Card>
              {/* <div className='text-center'>
                <ShoppingCartOutlined
                  style={{ display: 'block', fontSize: '2rem' }}
                />
                Hiện chưa có sản phẩm
              </div> */}
              <div style={{ maxHeight: '220px', overflowY: 'scroll' }}>
                <Row>
                  <Col md={4}>
                    <img
                      src='https://res.cloudinary.com/dmdjl8w8l/image/upload/v1647175664/1647175662433.jpg'
                      alt='test'
                      style={{ width: '3.2rem' }}
                    />
                  </Col>
                  <Col md={19} offset={1}>
                    <Row justify='space-between' align='middle'>
                      <Col>
                        <span style={{ fontSize: '0.8rem' }}>
                          {`${str.substring(0, 25)}...`}
                        </span>
                      </Col>
                      <Col>
                        <CloseOutlined />
                      </Col>
                    </Row>
                    <Row
                      justify='space-between'
                      align='middle'
                      className='mt-2'
                    >
                      <Col>
                        <Tag>2</Tag>
                      </Col>
                      <Col>
                        <span>296.000đ</span>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className='mt-3'>
                  <Col md={4}>
                    <img
                      src='https://res.cloudinary.com/dmdjl8w8l/image/upload/v1647175664/1647175662433.jpg'
                      alt='test'
                      style={{ width: '3.2rem' }}
                    />
                  </Col>
                  <Col md={19} offset={1}>
                    <Row justify='space-between' align='middle'>
                      <Col>
                        <span style={{ fontSize: '0.8rem' }}>
                          {`${str.substring(0, 25)}...`}
                        </span>
                      </Col>
                      <Col>
                        <CloseOutlined />
                      </Col>
                    </Row>
                    <Row
                      justify='space-between'
                      align='middle'
                      className='mt-2'
                    >
                      <Col>
                        <Tag>2</Tag>
                      </Col>
                      <Col>
                        <span>296.000đ</span>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className='mt-3'>
                  <Col md={4}>
                    <img
                      src='https://res.cloudinary.com/dmdjl8w8l/image/upload/v1647175664/1647175662433.jpg'
                      alt='test'
                      style={{ width: '3.2rem' }}
                    />
                  </Col>
                  <Col md={19} offset={1}>
                    <Row justify='space-between' align='middle'>
                      <Col>
                        <span style={{ fontSize: '0.8rem' }}>
                          {`${str.substring(0, 25)}...`}
                        </span>
                      </Col>
                      <Col>
                        <CloseOutlined />
                      </Col>
                    </Row>
                    <Row
                      justify='space-between'
                      align='middle'
                      className='mt-2'
                    >
                      <Col>
                        <Tag>2</Tag>
                      </Col>
                      <Col>
                        <span>296.000đ</span>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className='mt-3'>
                  <Col md={4}>
                    <img
                      src='https://res.cloudinary.com/dmdjl8w8l/image/upload/v1647175664/1647175662433.jpg'
                      alt='test'
                      style={{ width: '3.2rem' }}
                    />
                  </Col>
                  <Col md={19} offset={1}>
                    <Row justify='space-between' align='middle'>
                      <Col>
                        <span style={{ fontSize: '0.8rem' }}>
                          {`${str.substring(0, 25)}...`}
                        </span>
                      </Col>
                      <Col>
                        <CloseOutlined />
                      </Col>
                    </Row>
                    <Row
                      justify='space-between'
                      align='middle'
                      className='mt-2'
                    >
                      <Col>
                        <Tag>2</Tag>
                      </Col>
                      <Col>
                        <span>296.000đ</span>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
              <Divider />
              <Row align='middle' justify='space-between'>
                <span>Tổng tiền</span>
                <span>12.000.000 đ</span>
              </Row>
              <Row className='mt-4' justify='space-between'>
                <Button type='primary'>Xem giỏ hàng</Button>
                <Button type='primary'>Thanh toán</Button>
              </Row>
            </Card>
          }
        >
          <Badge size='small' count={5}>
            <span className='text-reset me-2' style={{ cursor: 'pointer' }}>
              <i className='fas fa-shopping-cart'></i>
            </span>
          </Badge>
        </Popover>
        {!user && (
          <div className='d-flex' style={{ marginLeft: '0.5rem' }}>
            <Link
              className='text-reset d-flex align-items-center'
              to='/login'
              style={{ marginLeft: '0.2rem' }}
            >
              <UserOutlined /> Đăng nhập
            </Link>
          </div>
        )}

        {user && user.role === 'subscriber' && (
          <Dropdown overlay={userMenu}>
            <div
              className='d-flex align-items-center'
              style={{ marginLeft: '0.5rem' }}
            >
              <img
                src={user.avatar || avatar}
                className='rounded-circle'
                height='25'
                alt='Black and White Portrait of a Man'
                loading='lazy'
                style={{ marginRight: '0.2rem' }}
              />
              {`${user.email.split('@')[0].substring(0, 10)}...`}
            </div>
          </Dropdown>
        )}
        {user && user.role === 'admin' && (
          <Dropdown overlay={adminMenu}>
            <div
              className='d-flex align-items-center'
              style={{ marginLeft: '0.5rem' }}
            >
              <img
                src={user.avatar || avatar}
                className='rounded-circle'
                height='25'
                alt='Black and White Portrait of a Man'
                loading='lazy'
                style={{ marginRight: '0.2rem' }}
              />
              <Tooltip title={user.email.split('@')[0]} placement='left'>
                {`${user.email.split('@')[0].substring(0, 10)}...`}
              </Tooltip>
            </div>
          </Dropdown>
        )}
      </div>
    </>
  );
};

export default RightMenu;
