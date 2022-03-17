import {
  HeartOutlined,
  ShoppingCartOutlined,
  StarOutlined,
} from '@ant-design/icons';
import {
  Breadcrumb,
  Card,
  Col,
  List,
  Row,
  Tabs,
  Tooltip,
  Typography,
} from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link, useParams } from 'react-router-dom';
import * as api from '../api/productApi';
import Loader from '../components/Loader';
import Page404 from './Page404';

const SingleProduct = () => {
  const { Item } = Breadcrumb;
  const params = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(true);
  // const [counter, setCounter] = useState(0);
  useEffect(() => {
    setLoading(true);
    api
      .getOne(params.slug)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
        setErr(false);
      })
      .catch((err) => {
        setLoading(false);
        setErr(true);
      });
  }, [params]);
  console.log(product);

  return (
    <div className='container py-2'>
      {/* <button onClick={() => setCounter(counter + 1)}>{counter}</button> */}
      {loading && <Loader />}
      {!loading && !err && (
        <>
          {' '}
          <Row>
            <Breadcrumb style={{ padding: '16px 0' }}>
              <Link to='/'>
                <Item>TRANG CHỦ</Item>
              </Link>
              <Link to='/product'>
                <Item>SẢN PHẨM</Item>
              </Link>

              <Link to={`/category/${product.category?.slug}`}>
                <Item>{product.category.name.toUpperCase()}</Item>
              </Link>
              <Link to={`/sub/${product.sub[0].slug}`}>
                <Item>{product.sub[0].name.toUpperCase()}</Item>
              </Link>
              <Item>{`${product.title
                .toUpperCase()
                .substring(0, 40)}...`}</Item>
            </Breadcrumb>
          </Row>
          <div className='d-flex flex-wrap justify-content-between align-items-center'>
            <Title level={4}> {product.title}</Title>
            <div className='text-center mx-2'>
              {product?.ratings?.length === 0 && 'Không có đánh giá'}
            </div>
          </div>
          <Row gutter={16}>
            <Col className='gutter-row' md={{ span: 12 }} xs={{ span: 24 }}>
              <Carousel
                autoPlay={true}
                infiniteLoop={true}
                showArrows={false}
                showStatus={false}
              >
                {product?.images?.map((image, id) => {
                  return <img key={id} alt='' src={image.url} />;
                })}
              </Carousel>
            </Col>
            <Col className='gutter-row' md={{ span: 12 }} xs={{ span: 24 }}>
              <Card
                actions={[
                  <>
                    {product.quantity - product.sold === 0 ? (
                      <p style={{ cursor: 'not-allowed' }}>Hết hàng</p>
                    ) : (
                      <Tooltip title='Thêm vào giỏ hàng'>
                        <ShoppingCartOutlined className='text-primary' />
                      </Tooltip>
                    )}
                  </>,

                  <Tooltip title='Thêm sản phẩm vào danh sách yêu thích'>
                    <HeartOutlined className='text-danger' />
                  </Tooltip>,
                  <Tooltip title='Đăng nhập để đánh giá'>
                    <StarOutlined className='text-success' />
                  </Tooltip>,
                ]}
              >
                <List>
                  <List.Item>
                    <List.Item.Meta title='Giá tiền: ' />
                    <div>
                      {product?.price?.toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </div>
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta title='Shipping: ' />
                    <div>{product.shipping}</div>
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta title='Màu sắc: ' />
                    <div>{product.color}</div>
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta title='Thương hiệu: ' />
                    <div>{product.brand}</div>
                  </List.Item>
                  {product.quantity - product.sold !== 0 && (
                    <List.Item>
                      <List.Item.Meta title='Số lượng: ' />
                      <div>{product.quantity - product.sold}</div>
                    </List.Item>
                  )}
                </List>
              </Card>
              <Tabs type='card' className='mt-2'>
                <Tabs.TabPane tab='Mô tả' key='1'>
                  {product?.description?.split('. ').map((str) => (
                    <Typography.Title level={5}>
                      {str.charAt(0).toUpperCase() + str.slice(1)}
                    </Typography.Title>
                  ))}
                </Tabs.TabPane>
                <Tabs.TabPane tab='Thông tin thêm' key='2'>
                  Call us on xxxx xxx xxx to learn more about this product.
                </Tabs.TabPane>
              </Tabs>
            </Col>
          </Row>
        </>
      )}
      {!loading && err && <Page404 />}
    </div>
  );
};

export default SingleProduct;
