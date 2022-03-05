import React, { useState, useEffect } from 'react';
import * as categoryApi from '../../api/categoryApi';
import * as subCategoryApi from '../../api/subCategoryApi';
import {
  Alert,
  Button,
  Form,
  Input,
  Layout,
  Modal,
  notification,
  Row,
  Select,
  Space,
} from 'antd';
import { Content } from 'antd/lib/layout/layout';
import AdminNav from '../../components/AdminNav';
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';

const SubCategory = () => {
  const { user } = useSelector((state) => state.user);
  const [sub, setSub] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [updateVisible, setUpdateVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSub, setSelectedSub] = useState('');
  const [selectedSlug, setSelectedSlug] = useState('');

  useEffect(() => {
    categoryApi.getAllCategories().then((res) => setCategories(res.data));
    subCategoryApi.getAllSubCategories().then((res) => setSub(res.data));
  }, [loading]);

  const changeHandler = (e) => {
    setKeyword(e.target.value.toLowerCase().trimEnd().trimStart());
  };

  const onFinish = (values) => {
    console.log(values);
    setLoading(true);
    subCategoryApi
      .createSubCategory(
        values.sub.trimEnd().trimStart(),
        values.category,
        user.token
      )
      .then((res) => {
        console.log(res);
        setLoading(false);
        notification.success({
          message: `${values.sub} được tạo thành công`,
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

  const showDeleteModal = (name, slug) => {
    Modal.confirm({
      title: 'Bạn muốn xóa không',
      icon: <ExclamationCircleOutlined />,
      okText: 'Xóa',
      cancelText: 'Không',
      onOk: () => {
        deleteHandler(name, slug);
      },
    });
  };

  const deleteHandler = (name, slug) => {
    subCategoryApi
      .deleteSubCategory(slug, user.token)
      .then(() => {
        subCategoryApi.getAllSubCategories().then((res) => {
          setSub(res.data);
          notification.success({
            message: `${name} đã xóa thành công`,
            duration: 2,
          });
        });
      })
      .catch((err) => {
        notification.error({
          message: err.response.data.message,
          duration: 3,
        });
      });
  };
  const onFinishUpdate = (values) => {
    setUpdateLoading(true);
    subCategoryApi
      .updateSubCategory(selectedSlug, values.sub, values.category, user.token)
      .then((_res) => {
        notification.success({
          message: 'Cập nhật thành công',
          duration: 3,
        });
        setUpdateLoading(false);
        setUpdateVisible(false);
        subCategoryApi.getAllSubCategories().then((res) => setSub(res.data));
      })
      .catch((err) => {
        setUpdateLoading(false);
        notification.error({
          message: err.response.data.message,
          duration: 3,
        });
      });
  };

  return (
    <Layout
      style={{ padding: '24px 0', background: '#fff', flexDirection: 'row' }}
    >
      <AdminNav selectedKey='sub' />
      <Content style={{ padding: '0 24px', minHeight: 280 }}>
        <div className='container'>
          <div className='row' style={{ justifyContent: 'center' }}>
            <div className='col-lg-8 col-md-10 col-sm-12'>
              <Form onFinish={onFinish}>
                <Row className='justify-content-between'>
                  <Form.Item
                    name='category'
                    style={{
                      display: 'inline-block',
                      width: '30%',
                    }}
                    rules={[
                      { required: true, message: 'Vui lòng chọn danh mục' },
                    ]}
                  >
                    <Select allowClear placeholder='Chọn danh mục'>
                      {categories.map((c, id) => {
                        return (
                          <Select.Option key={id} value={c._id}>
                            {c.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name='sub'
                    style={{
                      display: 'inline-block',
                      width: '69%',
                    }}
                    rules={[
                      { required: true, message: 'Vui lòng nhập danh mục con' },
                    ]}
                  >
                    <Input
                      placeholder='Danh mục con'
                      type='text'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Item>
                </Row>
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
                    placeholder='danh mục con...'
                    suffix={<SearchOutlined />}
                    onChange={changeHandler}
                  />
                </div>
              </div>
              <hr />
              {sub
                .filter((sub) => sub.name.toLowerCase().includes(keyword))
                .map((s) => {
                  return (
                    <Alert
                      className='mb-2'
                      message={`${s.name} ( ${
                        categories.find((c) => c._id === s.parent)?.name
                      } )`}
                      key={s._id}
                      type='info'
                      action={
                        <>
                          <EditOutlined
                            className='mx-2'
                            onClick={() => {
                              setSelectedCategory(s.parent);
                              setSelectedSub(s.name);
                              setSelectedSlug(s.slug);
                              setUpdateVisible(true);
                            }}
                          />{' '}
                          <DeleteOutlined
                            onClick={() => {
                              showDeleteModal(s.name, s.slug);
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
          fields={[
            { name: 'category', value: selectedCategory },
            { name: 'sub', value: selectedSub },
          ]}
        >
          <Form.Item name='category'>
            <Select placeholder='Chọn danh mục'>
              {categories.map((c, id) => {
                return (
                  <Select.Option key={id} value={c._id}>
                    {c.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name='sub'
            rules={[
              { required: true, message: 'Vui lòng nhập tên danh mục con' },
              {
                min: 3,
                max: 32,
                message: 'Danh mục con phải có từ 3 đến 32 ký tự',
              },
            ]}
          >
            <Input placeholder='Danh mục con' type='text' />
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

export default SubCategory;
