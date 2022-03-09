import { Alert, Modal, notification } from 'antd';
import React, { useState } from 'react';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import * as api from '../../api/categoryApi';
import CategoryUpdateModal from './CategoryUpdateModal';

const CategoryList = ({
  categories,
  setCategories,
  keyword,
  setUpdateName,
  setUpdateSlug,
  userToken,
  updateName,
  updateSlug,
}) => {
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);

  const deleteHandler = (name, slug) => {
    api
      .deleteCategory(slug, userToken)
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

  return (
    <>
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
      <CategoryUpdateModal
        updateVisible={updateVisible}
        setUpdateVisible={setUpdateVisible}
        userToken={userToken}
        setCategories={setCategories}
        updateName={updateName}
        updateSlug={updateSlug}
      />
    </>
  );
};

export default CategoryList;
