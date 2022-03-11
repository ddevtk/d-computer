import {
  Button,
  Card,
  Col,
  Layout,
  Modal,
  notification,
  Pagination,
  Row,
  Typography,
  Tooltip,
} from 'antd';
import { Content } from 'antd/lib/layout/layout';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import AdminNav from '../../components/AdminNav';
import * as api from '../../api/productApi';
import LoadingCard from '../../components/Card/LoadingCard';
import { Link } from 'react-router-dom';
import image from '../../../src/images/laptop.jpg';

const ProductList = () => {
  const { user } = useSelector((state) => state.user);
  const { Meta } = Card;
  const [products, setProducts] = useState({ total: '', items: [] });
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [deleteVisible, setDeleteVisible] = useState(false);

  useEffect(() => {
    loadProduct();
  }, []);
  const loadProduct = (current = 1, pageSize = 4) => {
    setLoading(true);
    api
      .getProductPerPage(current, pageSize)
      .then((res) => {
        setProducts({ total: res.data.total, items: res.data.products });
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  };

  const changePagination = (current, pageSize) => {
    setCurrent(current);
    loadProduct(current, pageSize);
  };

  const deleteHandler = (slug) => {
    console.log(slug);
    api
      .deleteProduct(slug, user.token)
      .then((res) => {
        notification.success({
          message: 'Xóa sản phẩm thành công',
          duration: 2,
        });
        setDeleteVisible(false);
        loadProduct();
      })
      .catch((err) => {
        notification.error({ message: err.response.data.message, duration: 2 });
        setDeleteVisible(false);
      });
  };

  const showDeleteModal = (slug) => {
    Modal.confirm({
      title: 'Bạn có muốn xóa sản phẩm này?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Xóa',
      cancelText: 'Không',
      onOk: () => {
        deleteHandler(slug);
      },
      visible: deleteVisible,
      onCancel: () => {
        setDeleteVisible(false);
      },
    });
  };

  return (
    <Layout
      style={{ padding: '24px 0', background: '#fff', flexDirection: 'row' }}
    >
      <AdminNav selectedKey='products' />
      <Content style={{ padding: '0 24px', minHeight: 280 }}>
        <Row justify='space-between'>
          <Typography.Title level={2}>Tất cả sản phẩm</Typography.Title>
          <Link to='/admin/product/create'>
            <Button type='primary'>Tạo sản phẩm</Button>
          </Link>
        </Row>
        <Row justify='start' gutter={[16, 16]}>
          {loading && <LoadingCard count={4} />}
          {!loading &&
            products.items.map((product) => {
              return (
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  className='gutter-row'
                  key={product._id}
                >
                  <Card
                    className='bg-image hover-zoom'
                    cover={
                      <img
                        alt='example'
                        src={
                          product.images.length !== 0
                            ? product.images[0].url
                            : image
                        }
                        style={{ objectFit: 'contain', height: '15rem' }}
                      />
                    }
                    actions={[
                      <EditOutlined />,
                      <DeleteOutlined
                        onClick={() => {
                          setDeleteVisible(true);
                          showDeleteModal(product.slug);
                        }}
                      />,
                    ]}
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
                      description={`${product.description.substring(
                        0,
                        100
                      )}...`}
                    />
                  </Card>
                </Col>
              );
            })}
        </Row>
        <Pagination
          total={products.total}
          current={current}
          pageSize={4}
          responsive
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem',
          }}
          onChange={changePagination}
        />
      </Content>
    </Layout>
  );
};

export default ProductList;
