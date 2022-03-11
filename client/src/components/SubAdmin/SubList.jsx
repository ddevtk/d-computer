import { Alert, Modal, notification, Skeleton } from 'antd';
import React, { useState } from 'react';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import SubUpdateModal from './SubUpdateModal';

const SubList = ({
  loadingSub,
  sub,
  keyword,
  categories,
  selectedCategory,
  setSelectedCategory,
  setSelectedSub,
  setSelectedSlug,
  subCategoryApi,
  userToken,
  setSub,
  selectedSub,
  selectedSlug,
}) => {
  const [updateVisible, setUpdateVisible] = useState(false);

  const deleteHandler = (name, slug) => {
    subCategoryApi
      .deleteSubCategory(slug, userToken)
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
  return (
    <div>
      {loadingSub && (
        <Skeleton active>
          <Alert className='mb-2'></Alert>
        </Skeleton>
      )}
      {!loadingSub &&
        sub
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
      <SubUpdateModal
        categories={categories}
        selectedCategory={selectedCategory}
        selectedSlug={selectedSlug}
        selectedSub={selectedSub}
        setUpdateVisible={setUpdateVisible}
        userToken={userToken}
        setSub={setSub}
        updateVisible={updateVisible}
      />
    </div>
  );
};

export default SubList;
