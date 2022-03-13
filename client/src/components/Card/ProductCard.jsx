import { Card, Col, Tooltip, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import image from '../../images/laptop.jpg';

const ProductCard = ({ product }) => {
  const { Meta } = Card;
  return (
    <Col xs={24} sm={12} md={8} lg={8} className='gutter-row' key={product._id}>
      <Card
        className='bg-image hover-zoom'
        cover={
          <Link to={`/admin/product/${product.slug}`}>
            <img
              alt='example'
              src={product.images.length !== 0 ? product.images[0].url : image}
              style={{
                objectFit: 'contain',
                height: '15rem',
                width: '100%',
              }}
            />
          </Link>
        }
      >
        <Meta
          title={
            <Tooltip title={product.title}>
              <Link
                className='custom-hover'
                to={`/admin/product/${product.slug}`}
              >
                {product.title}
              </Link>
            </Tooltip>
          }
          description={`${product.description.substring(0, 100)}...`}
        />
        <Typography.Paragraph type='danger' style={{ marginTop: '1rem' }}>
          {product.price.toLocaleString('it-IT', {
            style: 'currency',
            currency: 'VND',
          })}
        </Typography.Paragraph>
      </Card>
    </Col>
  );
};

export default ProductCard;
