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
  const [loadingCat, setLoadingCat] = useState(null);

  const [categories, setCategories] = useState([]);
  const [updateName, setUpdateName] = useState('');
  const [updateSlug, setUpdateSlug] = useState('');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (loading === false && loadingCat !== null) {
      api.getAllCategories().then((res) => {
        setCategories(res.data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  useEffect(() => {
    setLoadingCat(true);
    api.getAllCategories().then((res) => {
      setLoadingCat(false);
      setCategories(res.data);
    });
  }, []);

  return (
    <Layout
      style={{
        padding: '1.5rem 0',
        backgroundColor: 'rgb(245, 248, 253)',
        flexDirection: 'row',
        minHeight: '90vh',
      }}
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
                loadingCat={loadingCat}
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
