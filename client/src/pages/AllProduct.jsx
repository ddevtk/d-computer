import React, { useEffect, useState } from 'react';
import { Row, Breadcrumb, Button, Col } from 'antd';
import { Link } from 'react-router-dom';
import * as categoryApi from '../api/categoryApi';

const AllProduct = () => {
  const { Item } = Breadcrumb;
  const [category, setCategory] = useState([]);

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () => {
    categoryApi.getAllCategories().then((res) => {
      setCategory(res.data);
    });
  };
  console.log(category);

  return (
    <div className='container py-2' style={{ backgroundColor: '#f8f8f8' }}>
      <Row>
        <Breadcrumb style={{ padding: '16px 0' }}>
          <Link to='/'>
            <Item>TRANG CHỦ</Item>
          </Link>
          <Item>SẢN PHẨM</Item>
        </Breadcrumb>
      </Row>
      <Row>
        {category.length !== 0 &&
          category.map((c) => {
            return (
              <Col span={4} key={c._id}>
                <Button className='hover-fill' style={{ width: '100%' }}>
                  {c.name.toUpperCase()}
                </Button>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default AllProduct;
