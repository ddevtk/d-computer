import { Button, Form, Input, InputNumber, Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import AdminNav from '../../components/AdminNav';

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
  const [values, setValues] = useState(initialState);
  const validateMessages = {
    required: 'Vui lòng nhập ${label}',
  };
  const onFinish = (values) => {
    console.log(values);
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
            <Input placeholder='Nhập danh mục' />
          </Form.Item>
          <Form.Item
            name='description'
            label='Mô tả'
            rules={[{ required: true }]}
          >
            <Input placeholder='Nhập mô tả' />
          </Form.Item>
          <Form.Item
            name='price'
            label='Giá tiền'
            rules={[
              { required: true },
              {
                validator: async (_, price) => {
                  console.log(price);

                  if (isNaN(price)) {
                    return Promise.reject(new Error('Giá tiền không hợp lệ'));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input placeholder='Nhập giá tiền' style={{ width: '10rem' }} />
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
