import {
  Button,
  Form,
  Input,
  Layout,
  notification,
  Select,
  Upload,
} from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { UploadOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import Resizer from 'react-image-file-resizer';
import AdminNav from '../../components/AdminNav';
import * as productApi from '../../api/productApi';
import * as categoryApi from '../../api/categoryApi';
import * as subCategoryApi from '../../api/subCategoryApi';
import * as cloudinaryApi from '../../api/cloudinaryApi';
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

const resizeImage = (file, allUriString, setUriString) => {
  Resizer.imageFileResizer(
    file,
    720,
    720,
    'JPEG',
    100,
    0,
    (uri) => {
      allUriString.push(uri);
      setUriString(allUriString);
    },
    'base64',
    200,
    200
  );
};

const Product = () => {
  const [form] = Form.useForm();
  const { user } = useSelector((state) => state.user);
  const [categories, setCategories] = useState([]);
  const [createLoading, setCreateLoading] = useState(false);
  const [fields, setFields] = useState([{ name: 'sub', value: [] }]);
  const [sub, setSub] = useState([]);
  const [uriString, setUriString] = useState([]);

  let allUriString = [];

  const validateMessages = {
    // eslint-disable-next-line no-template-curly-in-string
    required: 'Vui lòng nhập ${label}',
  };
  const onFinish = async (values) => {
    try {
      setCreateLoading(true);
      const imageArr = await Promise.all(
        uriString.map(async (uri) => {
          try {
            const res = await cloudinaryApi.uploadImages(uri, user.token);
            return res.data;
          } catch (error) {
            throw new Error(error.response.data.message);
          }
        })
      );
      try {
        await productApi.createProduct(
          { ...values, images: imageArr },
          user.token
        );
        notification.success({
          message: 'Tạo sản phẩm thành công',
          duration: 3,
        });
      } catch (error) {
        throw new Error(error.response.data.message);
      }

      setCreateLoading(false);
      form.resetFields();
    } catch (error) {
      setCreateLoading(false);
      notification.error({
        message: error.message,
        duration: 3,
      });
    }
  };

  const onChangeFile = (info) => {
    switch (info.file.status) {
      case 'done':
        if (info.file.uid === info.fileList[info.fileList.length - 1].uid) {
          info.fileList.forEach((_file, id) => {
            if (id === info.fileList.length - 1) {
              info.fileList.forEach((f) => {
                resizeImage(f.originFileObj, allUriString, setUriString);
              });
            }
          });
        }
        break;
      case 'removed':
        allUriString = [];
        info.fileList.forEach((file) => {
          resizeImage(file.originFileObj, allUriString, setUriString);
        });
        break;
      default:
        break;
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  useEffect(() => {
    categoryApi.getAllCategories().then((res) => setCategories(res.data));
  }, []);

  return (
    <Layout
      style={{ padding: '24px 0', background: '#fff', flexDirection: 'row' }}
    >
      <AdminNav selectedKey='products' />
      <Content style={{ padding: '0 24px', minHeight: 280 }}>
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          validateMessages={validateMessages}
          onFinish={onFinish}
          fields={fields}
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
          <Form.Item
            label='Danh mục'
            name='category'
            rules={[{ required: true }]}
          >
            <Select
              style={{ width: '10rem' }}
              placeholder='Chọn danh mục'
              allowClear
              onChange={(value) => {
                if (value) {
                  setFields([{ name: 'sub', value: [] }]);
                  subCategoryApi
                    .getSubsByCategoryId(value)
                    .then((res) => setSub(res.data));
                } else {
                  setSub([]);
                  setFields([{ name: 'sub', value: [] }]);
                }
              }}
            >
              {categories?.map((c, id) => (
                <Select.Option value={c._id} key={id}>
                  {c.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label='Danh mục con'
            name='sub'
            rules={[{ required: true }]}
          >
            <Select
              maxTagCount='responsive'
              mode='multiple'
              style={{ width: '25rem' }}
              placeholder='Chọn danh mục con'
              allowClear
              disabled={sub.length === 0}
            >
              {sub.length !== 0 &&
                sub?.map((s, id) => (
                  <Select.Option value={s._id} key={id}>
                    {s.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name='images'
            label='Ảnh sản phẩm'
            valuePropName='fileList'
            getValueFromEvent={normFile}
            rules={[{ required: true }]}
          >
            <Upload
              multiple
              accept='images/*'
              onChange={onChangeFile}
              customRequest={dummyRequest}
              listType='picture'
            >
              <Button
                icon={<UploadOutlined />}
                className='d-flex align-items-center'
              >
                Tải ảnh lên
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 4 }}>
            <Button type='primary' htmlType='submit'>
              {createLoading ? 'Chờ chút...' : 'Tạo'}
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default Product;
