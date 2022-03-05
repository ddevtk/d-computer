import React from 'react';
import {
  Alert,
  Button,
  Form,
  Input,
  Layout,
  Modal,
  notification,
  Row,
  Space,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Content } from 'antd/lib/layout/layout';
import AdminNav from '../../components/AdminNav';
import * as api from '../../api/categoryApi';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const Category = () => {
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [updateName, setUpdateName] = useState('');
  const [updateSlug, setUpdateSlug] = useState('');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    api.getAllCategories().then((res) => setCategories(res.data));
  }, [loading]);

  const showDeleteModal = (name, slug) => {
    Modal.confirm({
      title: 'Bạn có muốn xóa danh mục này?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Xóa',
      cancelText: 'Không',
      onOk: () => {
        deleteHandler(name, slug);
      },
      visible: deleteVisible,
      onCancel: () => {
        setDeleteVisible(false);
      },
    });
  };

  const onFinishCreate = (values) => {
    setLoading(true);
    setKeyword('');
    api
      .createCategory(values.category.trim(), user.token)
      .then((_res) => {
        setLoading(false);
        notification.success({
          message: `${values.category.trim()} được tạo thành công`,
          duration: 2,
        });
      })
      .catch((err) => {
        setLoading(false);
        notification.error({
          message: err.response.data.message,
          duration: 3,
        });
      });
  };

  const onFinishUpdate = (values) => {
    console.log(values);
    setUpdateLoading(true);
    api
      .updateCategory(updateSlug, values.category.trim(), user.token)
      .then(() => {
        setUpdateLoading(false);
        api.getAllCategories().then((res) => {
          setCategories(res.data);
          notification.success({
            message: 'Cập nhật danh mục thành công',
            duration: 3,
          });
          setUpdateVisible(false);
        });
      })
      .catch((err) => {
        setUpdateLoading(false);
        notification.error({
          message: err.response.data.message,
          duration: 3,
        });
      });
  };

  const deleteHandler = (name, slug) => {
    api
      .deleteCategory(slug, user.token)
      .then(() => {
        api.getAllCategories().then((res) => {
          setCategories(res.data);
          notification.success({
            message: `${name} đã xóa thành công`,
            duration: 2,
          });
          setDeleteVisible(false);
        });
      })
      .catch((err) => {
        console.error(err.response.data.message);
        notification.error({
          message: err.response.data.message,
          duration: 2,
        });
        setDeleteVisible(false);
      });
  };

  const changeHandler = (e) => {
    setKeyword(e.target.value.toLowerCase().trimEnd().trimStart());
  };

  return (
    <Layout
      style={{ padding: '24px 0', background: '#fff', flexDirection: 'row' }}
    >
      <AdminNav selectedKey='categories' />
      <Content style={{ padding: '0 24px', minHeight: 280 }}>
        <div className='container'>
          <div className='row' style={{ justifyContent: 'center' }}>
            <div className='col-lg-8 col-md-10 col-sm-12'>
              <Form onFinish={onFinishCreate}>
                <Form.Item
                  name='category'
                  rules={[
                    { required: true, message: 'Vui lòng nhập tên danh mục' },
                    {
                      min: 3,
                      max: 32,
                      message: 'Danh mục phải có từ 3 đến 32 ký tự',
                    },
                  ]}
                >
                  <Input placeholder='Danh mục' allowClear />
                </Form.Item>
                <Form.Item>
                  <Button type='primary' htmlType='submit'>
                    {loading ? 'Chờ chút...' : 'Tạo'}
                  </Button>
                </Form.Item>
              </Form>
              <div
                className='row'
                style={{ flexDirection: 'row-reverse', marginTop: '-3.5rem' }}
              >
                <div className='col-md-4 col-sm-6'>
                  <Input
                    placeholder='danh mục...'
                    style={{}}
                    suffix={<SearchOutlined />}
                    onChange={changeHandler}
                  />
                </div>
              </div>
              <hr />
              {categories
                .filter((c) => c.name.toLowerCase().includes(keyword))
                .map((category) => {
                  return (
                    <Alert
                      className='mb-2'
                      message={category.name}
                      key={category._id}
                      type='info'
                      action={
                        <>
                          <EditOutlined
                            className='mx-2'
                            onClick={() => {
                              setUpdateName(category.name);
                              setUpdateSlug(category.slug);
                              setUpdateVisible(true);
                            }}
                          />{' '}
                          <DeleteOutlined
                            onClick={() => {
                              setDeleteVisible(true);
                              showDeleteModal(category.name, category.slug);
                            }}
                          />
                        </>
                      }
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </Content>
      <Modal
        visible={updateVisible}
        title='Cập nhật danh mục'
        onCancel={() => {
          setUpdateVisible(false);
        }}
        footer={null}
      >
        <Form
          onFinish={onFinishUpdate}
          fields={[{ name: 'category', value: updateName }]}
        >
          <Form.Item
            name='category'
            rules={[
              { required: true, message: 'Vui lòng nhập tên danh mục' },
              {
                min: 3,
                max: 32,
                message: 'Danh mục phải có từ 3 đến 32 ký tự',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Row style={{ justifyContent: 'center', margin: '40px 0px 0px 0px' }}>
            <Space size='small'>
              <Button onClick={() => setUpdateVisible(false)}>Không</Button>
              <Button type='primary' htmlType='submit'>
                {updateLoading ? 'Chờ chút...' : 'Cập nhật'}
              </Button>
            </Space>
          </Row>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Category;
