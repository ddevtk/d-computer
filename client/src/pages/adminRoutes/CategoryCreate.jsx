import React from 'react';
import { Alert, Layout, notification } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Content } from 'antd/lib/layout/layout';
import AdminNav from '../../components/AdminNav';
import * as api from '../../api/categoryApi';
import { useSelector } from 'react-redux';
import { MDBInput } from 'mdb-react-ui-kit';
import { useState } from 'react';
import { useEffect } from 'react';

const CategoryCreate = () => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.getAllCategories().then((res) => setCategories(res.data));
  }, [loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    api
      .createCategory(name, user.token)
      .then((res) => {
        setName('');
        setLoading(false);
        notification.success({
          message: `${name} được tạo thành công`,
          duration: 3,
        });
        setName('');
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.message);
        setTimeout(() => {
          setError('');
        }, 3000);
      });
  };

  const deleteHandler = (name, slug) => {
    api
      .deleteCategory(slug, user.token)
      .then(() => {
        notification.success({
          message: `${name} đã xóa thành công`,
          duration: 3,
        });
        api.getAllCategories().then((res) => setCategories(res.data));
      })
      .catch((err) => {
        console.error(err.response.data.message);
      });
  };

  return (
    <Layout
      style={{ padding: '24px 0', background: '#fff', flexDirection: 'row' }}
    >
      <AdminNav selectedKey='categories' />
      <Content style={{ padding: '0 24px', minHeight: 280 }}>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
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
              <hr />
              {categories.map((category) => {
                return (
                  <Alert
                    className='mb-2'
                    message={category.name}
                    key={category._id}
                    type='info'
                    action={
                      <>
                        <EditOutlined className='mx-2' />{' '}
                        <DeleteOutlined
                          onClick={() =>
                            deleteHandler(category.name, category.slug)
                          }
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
    </Layout>
  );
};

export default CategoryCreate;
