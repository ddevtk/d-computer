import { Breadcrumb, Col, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link, useParams } from 'react-router-dom';
import * as api from '../api/productApi';

const SingleProduct = () => {
  const { Item } = Breadcrumb;
  const params = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    api.getOne(params.slug).then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
  }, [params]);
  console.log(product);

  return (
    <div className='container py-2'>
      <Row>
        <Breadcrumb style={{ padding: '16px 0' }}>
          <Link to='/'>
            <Item>TRANG CHỦ</Item>
          </Link>
          <Link to='/product'>
            <Item>SẢN PHẨM</Item>
          </Link>
          {!loading && (
            <Link to={`/category/${product.category.slug}`}>
              <Item>{product.category.name.toUpperCase()}</Item>
            </Link>
          )}
          {!loading && (
            <Link to={`/${product.sub[0].slug}`}>
              <Item>{product.sub[0].name.toUpperCase()}</Item>
            </Link>
          )}
          {!loading && (
            <Item>{`${product.title.toUpperCase().substring(0, 40)}...`}</Item>
          )}
        </Breadcrumb>
      </Row>
      <Title level={4}> {product.title}</Title>
      <Row gutter={16}>
        <Col className='gutter-row' span={12}>
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
        <Col className='gutter-row' span={12}></Col>
      </Row>
    </div>
  );
};

export default SingleProduct;
