import {
  Breadcrumb,
  Button,
  Col,
  Pagination,
  Row,
  Select,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as categoryApi from '../api/categoryApi';
import * as subApi from '../api/subCategoryApi';
import * as productApi from '../api/productApi';
import ProductCard from '../components/Card/ProductCard';
import LoadingCard from '../components/Card/LoadingCard';

const ProductByCategory = () => {
  const { Item } = Breadcrumb;
  const params = useParams();
  const [sub, setSub] = useState([]);
  const [current, setCurrent] = useState(1);
  const [products, setProducts] = useState({ total: '', items: [] });
  const [loading, setLoading] = useState(true);

  const loadSub = async () => {
    try {
      const categoryRes = await categoryApi.getCategory(params.slug);
      const subRes = await subApi.getSubsByCategoryId(categoryRes.data._id);
      setSub(subRes.data);
    } catch (error) {}
  };
  const loadProduct = async (current = 1, pageSize = 9) => {
    setLoading(true);
    try {
      const { data } = await productApi.getProductPerPage(current, pageSize);
      setProducts({ total: data.total.length, items: data.products });
      setTimeout(() => {
        setLoading(false);
      }, 100);
    } catch (error) {
      setLoading(false);
    }
  };

  const changePagination = (current, pageSize) => {
    setCurrent(current);
    loadProduct(current, pageSize);
  };

  useEffect(() => {
    loadSub();
    loadProduct();
  }, [params]);

  return (
    <>
      <div className='container py-2' style={{ backgroundColor: '#f8f8f8' }}>
        <Row>
          <Breadcrumb style={{ padding: '16px 0' }}>
            <Link to='/'>
              <Item>TRANG CHỦ</Item>
            </Link>
            <Link to='/product'>
              <Item>SẢN PHẨM</Item>
            </Link>
            <Item>{params.slug.toUpperCase()}</Item>
          </Breadcrumb>
        </Row>
        <Row>
          {sub.length !== 0 &&
            sub.map((s) => {
              return (
                <Col
                  lg={{ span: 4 }}
                  md={{ span: 6 }}
                  sm={{ span: 12 }}
                  key={s._id}
                >
                  <Button className='hover-fill' style={{ width: '100%' }}>
                    <Link to={`/sub/${s.slug}`}>{s.name.toUpperCase()}</Link>
                  </Button>
                </Col>
              );
            })}
        </Row>
        <Row className='mt-3 align-items-center justify-content-end'>
          <Typography.Text className='mx-2' style={{ color: '#1890ff' }}>
            Xếp theo giá:
          </Typography.Text>
          <Select placeholder='Vui lòng lựa chọn'>
            <Select.Option value='htl' key='htl'>
              Giá từ cao đến thấp
            </Select.Option>
            <Select.Option value='lth' key='lth'>
              Giá từ thấp đến cao
            </Select.Option>
          </Select>
        </Row>

        {loading && (
          <div
            className='container'
            style={{ backgroundColor: '#f8f8f8', marginBottom: '2rem' }}
          >
            <Row justify='start' gutter={[16, 16]}>
              <LoadingCard count={6} />
            </Row>
          </div>
        )}
        {!loading && (
          <Row justify='start' gutter={[16, 16]} className='mt-2'>
            {products.items.map((item) => (
              <ProductCard product={item} key={item._id} />
            ))}
          </Row>
        )}
        <Pagination
          total={products.total}
          current={current}
          pageSize={9}
          responsive
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem',
          }}
          onChange={changePagination}
        />
      </div>
    </>
  );
};

export default ProductByCategory;
