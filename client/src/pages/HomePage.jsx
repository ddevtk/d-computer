import { Row, Tag } from 'antd';
import React, { useState, useEffect } from 'react';
import * as productApi from '../api/productApi.js';
import * as subApi from '../api/subCategoryApi';
import ProductCard from '../components/Card/ProductCard.jsx';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { TransactionOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState({ total: '', items: [] });
  const [subCategory, setSubCategory] = useState({});
  const [loading, setLoading] = useState(true);

  const loadAllProducts = async () => {
    setLoading(TransactionOutlined);
    try {
      const productRes = await productApi.getProductPerPage();
      const subRes = await subApi.getAllSubCategories();
      const productObj = productRes.data.total.reduce((acc, obj) => {
        let key = obj['category']['slug'];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});
      // {'ipad': [], 'iphone': []}
      const subObj = subRes.data.reduce((acc, obj) => {
        let key = obj['parent']['slug'];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});

      // {'ipad': [], 'iphone': []}

      setProducts(Object.entries(productObj));
      setSubCategory(subObj);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <div style={{ backgroundColor: '#f5f8fd' }}>
      {/* <div>
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          showArrows={false}
        >
          {products.items.map((p, id) => {
            return (
              <img
                key={id}
                alt=''
                src={p.images.length !== 0 ? p.images[0].url : laptop}
                style={{ height: '85vh', objectFit: 'contain' }}
              />
            );
          })}
        </Carousel>
      </div> */}

      {!loading &&
        products.map((product) => {
          console.log(subCategory[product[0]]);
          return (
            <div
              className='container'
              style={{ backgroundColor: '#f8f8f8', marginBottom: '2rem' }}
            >
              <div
                className='d-flex justify-content-between align-items-center'
                style={{ flexWrap: 'wrap' }}
              >
                <Link to=''>
                  <h3 style={{ padding: '1rem 0.5rem' }}>
                    {product[0].toUpperCase()}
                  </h3>
                </Link>
                <div>
                  {subCategory[product[0]].slice(0, 6).map((sub, id) => {
                    return (
                      <Link to=''>
                        <Tag
                          color='default'
                          key={id}
                          style={{
                            color: '#1890ff',
                            borderRadius: '1rem',
                            padding: '0.1rem 1rem',
                          }}
                        >
                          {sub.name}
                        </Tag>
                      </Link>
                    );
                  })}
                  <Link to=''>
                    <Tag
                      style={{
                        borderRadius: '1rem',
                        padding: '0.1rem 1rem',
                        color: '#1890ff',
                      }}
                      color='default'
                    >
                      Xem tất cả
                    </Tag>
                  </Link>
                </div>
              </div>
              <Row justify='start' gutter={[16, 16]}>
                {product[1].slice(0, 6).map((item, id) => (
                  <ProductCard product={item} key={id} />
                ))}
              </Row>
            </div>
          );
        })}
    </div>
  );
};

export default HomePage;
