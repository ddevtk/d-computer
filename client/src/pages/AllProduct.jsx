import React, { useEffect, useState } from 'react';
import { Row, Breadcrumb, Button, Col, Pagination } from 'antd';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import * as categoryApi from '../api/categoryApi';
import * as productApi from '../api/productApi';
import CategoryOrSubButtonGroup from '../components/CategoryOrSubButtonGroup';
import SelectByPrice from '../components/SelectByPrice';
import LoadingCard from '../components/Card/LoadingCard';
import ProductCard from '../components/Card/ProductCard';

const formatStringForSearchHandler = (str) => {
  return str.replaceAll(' ', '').toLowerCase();
};

const filterByTitleHandler = (productArr, title) => {
  console.log(title);
  return title
    ? productArr.filter((p) => {
        return formatStringForSearchHandler(p.title).includes(
          formatStringForSearchHandler(title)
        );
      })
    : productArr;
};

const AllProduct = ({ match }) => {
  const { Item } = Breadcrumb;
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(1);
  const [products, setProducts] = useState({ total: '', items: [] });
  const [searchParams] = useSearchParams();

  const loadCategory = () => {
    categoryApi.getAllCategories().then((res) => {
      setCategory(res.data);
    });
  };

  const loadProduct = async (current = 1, pageSize = 9) => {
    setLoading(true);
    try {
      const { data } = await productApi.getProductPerPage(current, pageSize);

      setProducts({
        total: filterByTitleHandler(data.total, searchParams.get('title'))
          .length,
        items: filterByTitleHandler(data.products, searchParams.get('title')),
      });
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
    loadCategory();
    loadProduct();
  }, [searchParams]);
  // useEffect(() => {
  //   loadProduct();
  // }, [searchParams]);

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
            return <CategoryOrSubButtonGroup item={c} type='category' />;
          })}
      </Row>
      <Row className='mt-3 align-items-center justify-content-end'>
        <SelectByPrice />
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
  );
};

export default AllProduct;
