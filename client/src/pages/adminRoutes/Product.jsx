import { Button, Form, Input, Layout, notification, Select } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import AdminNav from '../../components/AdminNav';
import * as productApi from '../../api/productApi';
import { useSelector } from 'react-redux';

const initialState = {
  title: '',
  description: '',
  price: '',
  categories: [],
  category: '',
  sub: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'Asus'],
  color: '',
  brand: '',
};

const Product = () => {
  const { user } = useSelector((state) => state.user);
  const [product, setProduct] = useState(initialState);
  const validateMessages = {
    // eslint-disable-next-line no-template-curly-in-string
    required: 'Vui lòng nhập ${label}',
  };
  const onFinish = (values) => {
    // setProduct({ ...product, ...values });
    productApi
      .createProduct(values, user.token)
      .then((res) => console.log(res))
      .catch((err) => {
        notification.error({
          message: err.response.data.message,
          duration: 2,
        });
      });
  };
  return (
    <Layout
      style={{ padding: '24px 0', background: '#fff', flexDirection: 'row' }}
    >
      <AdminNav selectedKey='products' />
      <Content style={{ padding: '0 24px', minHeight: 280 }}>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          validateMessages={validateMessages}
          onFinish={onFinish}
        >
          <Form.Item
            name='title'
            label='Tên sản phẩm'
            rules={[{ required: true }]}
          >
            <Input allowClear placeholder='Nhập danh mục' />
          </Form.Item>
          <Form.Item
            name='description'
            label='Mô tả'
            rules={[{ required: true }]}
          >
            <Input allowClear placeholder='Nhập mô tả' />
          </Form.Item>
          <Form.Item
            name='price'
            label='Giá tiền'
            rules={[
              { required: true },
              {
                validator: (_, price) => {
                  if (price && isNaN(price)) {
                    return Promise.reject(new Error('Giá tiền không hợp lệ'));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input
              allowClear
              placeholder='Nhập giá tiền'
              style={{ width: '10rem' }}
            />
          </Form.Item>
          <Form.Item
            label='Shipping'
            name='shipping'
            rules={[{ required: true }]}
          >
            <Select
              style={{ width: '10rem' }}
              placeholder='Shipping'
              allowClear
            >
              <Select.Option value='Yes'>Yes</Select.Option>
              <Select.Option value='No'>No</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name='quantity'
            label='Số lượng'
            rules={[
              { required: true },
              {
                validator: (_, quantity) => {
                  if (quantity && isNaN(quantity)) {
                    return Promise.reject(new Error('Số lượng không hợp lệ'));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input
              allowClear
              placeholder='Nhập số lượng'
              style={{ width: '10rem' }}
            />
          </Form.Item>
          <Form.Item label='Màu sắc' name='color' rules={[{ required: true }]}>
            <Select
              style={{ width: '10rem' }}
              placeholder='Chọn màu'
              allowClear
            >
              {initialState.colors.map((c, id) => (
                <Select.Option value={c} key={id}>
                  {c}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label='Thương hiệu'
            name='brand'
            rules={[{ required: true }]}
          >
            <Select
              style={{ width: '10rem' }}
              placeholder='Chọn thương hiệu'
              allowClear
            >
              {initialState.brands.map((b, id) => (
                <Select.Option value={b} key={id}>
                  {b}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 4 }}>
            <Button type='primary' htmlType='submit'>
              Tạo
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default Product;
