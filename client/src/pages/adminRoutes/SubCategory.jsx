import React, { useState, useEffect } from 'react';
import * as categoryApi from '../../api/categoryApi';
import * as subCategoryApi from '../../api/subCategoryApi';
import { Col, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import AdminNav from '../../components/AdminNav';

import { useSelector } from 'react-redux';
import SubCreateForm from '../../components/SubAdmin/SubCreateForm';
import SubSearch from '../../components/SubAdmin/SubSearch';
import SubList from '../../components/SubAdmin/SubList';

const SubCategory = () => {
  const { user } = useSelector((state) => state.user);
  const [sub, setSub] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSub, setSelectedSub] = useState('');
  const [selectedSlug, setSelectedSlug] = useState('');
  const [loadingSub, setLoadingSub] = useState(null);

  useEffect(() => {
    if (loadingSub !== null && loading === false)
      categoryApi.getAllCategories().then((res) => {
        setCategories(res.data);
        subCategoryApi.getAllSubCategories().then((res) => {
          setSub(res.data);
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  useEffect(() => {
    setLoadingSub(true);
    categoryApi.getAllCategories().then((res) => {
      setCategories(res.data);
      subCategoryApi.getAllSubCategories().then((res) => {
        setLoadingSub(false);
        setSub(res.data);
      });
    });
  }, []);

  return (
    <Row
      style={{
        padding: '1.5rem 0',
        backgroundColor: 'rgb(245, 248, 253)',
        minHeight: '90vh',
      }}
    >
      <AdminNav selectedKey='sub' />
      <Col
        sm={24}
        xs={24}
        md={20}
        style={{ padding: '0 24px', minHeight: 280 }}
      >
        <div className='container'>
          <div className='row' style={{ justifyContent: 'center' }}>
            <div className='col-lg-8 col-md-10 col-sm-12'>
              <SubCreateForm
                loading={loading}
                categories={categories}
                setLoading={setLoading}
                subCategoryApi={subCategoryApi}
                userToken={user.token}
              />
              <SubSearch setKeyword={setKeyword} />
              <hr />
              <SubList
                loadingSub={loadingSub}
                categories={categories}
                keyword={keyword}
                selectedCategory={selectedCategory}
                selectedSub={selectedSub}
                setSelectedCategory={setSelectedCategory}
                setSelectedSlug={setSelectedSlug}
                setSub={setSub}
                userToken={user.token}
                setSelectedSub={setSelectedSub}
                sub={sub}
                selectedSlug={selectedSlug}
                subCategoryApi={subCategoryApi}
              />
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default SubCategory;
