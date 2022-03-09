import React from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import AdminNav from '../../components/AdminNav';
import * as api from '../../api/categoryApi';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import CategoryCreateForm from '../../components/CategoryAdmin/CategoryCreateForm';
import CategorySearch from '../../components/CategoryAdmin/CategorySearch';
import CategoryList from '../../components/CategoryAdmin/CategoryList';

const Category = () => {
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [updateName, setUpdateName] = useState('');
  const [updateSlug, setUpdateSlug] = useState('');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    api.getAllCategories().then((res) => setCategories(res.data));
  }, [loading]);

  return (
    <Layout
      style={{ padding: '24px 0', background: '#fff', flexDirection: 'row' }}
    >
      <AdminNav selectedKey='categories' />
      <Content style={{ padding: '0 24px', minHeight: 280 }}>
        <div className='container'>
          <div className='row' style={{ justifyContent: 'center' }}>
            <div className='col-lg-8 col-md-10 col-sm-12'>
              <CategoryCreateForm
                setKeyword={setKeyword}
                userToken={user.token}
                setLoading={setLoading}
                loading={loading}
              />
              <CategorySearch setKeyword={setKeyword} />
              <hr />
              <CategoryList
                categories={categories}
                keyword={keyword}
                setUpdateName={setUpdateName}
                setUpdateSlug={setUpdateSlug}
                userToken={user.token}
                setCategories={setCategories}
                updateName={updateName}
                updateSlug={updateSlug}
              />
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Category;
