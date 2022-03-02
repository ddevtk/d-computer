import React from 'react';
import { Alert, Input, Layout, Modal, notification } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Content } from 'antd/lib/layout/layout';
import AdminNav from '../../components/AdminNav';
import * as api from '../../api/categoryApi';
import { useSelector } from 'react-redux';
import { MDBInput } from 'mdb-react-ui-kit';
import { useState } from 'react';
import { useEffect } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const CategoryCreate = () => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [updateError, setUpdateError] = useState('');
  const [categories, setCategories] = useState([]);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [updateName, setUpdateName] = useState('');
  const [updateSlug, setUpdateSlug] = useState('');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    api.getAllCategories().then((res) => setCategories(res.data));
  }, [loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setKeyword('');
    api
      .createCategory(name, user.token)
      .then((res) => {
        setName('');
        setLoading(false);
        notification.success({
          message: `${name} được tạo thành công`,
          duration: 2,
        });
        setName('');
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.message);
        setTimeout(() => {
          setError('');
        }, 2000);
      });
  };
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
  const updateHandler = () => {
    const categoryLength = updateName.trimEnd().trimStart().length;
    if (categoryLength < 3 || categoryLength > 32) {
      setUpdateError('Tên danh mục phải nhỏ hơn 34 và lớn hơn 2 ký tự');
      setTimeout(() => {
        setUpdateError('');
      }, 2000);
    } else {
      api.updateCategory(updateSlug, updateName, user.token).then(() => {
        api
          .getAllCategories()
          .then((res) => {
            setCategories(res.data);
            notification.success({
              message: 'Cập nhật danh mục thành công',
              duration: 2,
            });
            setUpdateVisible(false);
            setUpdateName('');
            setUpdateError();
          })
          .catch((err) => {
            console.error(err.response.data.message);
            setUpdateVisible(false);
            setUpdateName('');
            setUpdateError();
          });
      });
    }
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    setKeyword('');
    updateHandler();
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
              <form onSubmit={handleSubmit}>
                <div className='form-outline mb-4'>
                  <MDBInput
                    label='Danh mục'
                    type='text'
                    className='form-control'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  {error && (
                    <Alert
                      showIcon
                      className='mt-2'
                      message={error}
                      type='error'
                    />
                  )}
                </div>

                <button type='submit' className='btn btn-primary mb-4'>
                  {loading ? 'Chờ chút...' : 'Tạo'}
                </button>
              </form>
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
        okText='Cập nhật'
        cancelText='Không'
        title='Cập nhật danh mục'
        onCancel={() => {
          setUpdateName('');
          setUpdateVisible(false);
        }}
        onOk={() => {
          updateHandler();
        }}
      >
        <form onSubmit={handleUpdateSubmit}>
          <MDBInput
            autoFocus
            label='Danh mục'
            type='text'
            className='mt-2'
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)}
          />
          {updateError && (
            <Alert
              showIcon
              className='mt-2'
              message={updateError}
              type='error'
            />
          )}
        </form>
      </Modal>
    </Layout>
  );
};

export default CategoryCreate;
