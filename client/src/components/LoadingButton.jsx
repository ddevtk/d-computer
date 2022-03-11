import { Button } from 'antd';
import React from 'react';

const LoadingButton = ({ loading, type }) => {
  return (
    <Button type='primary' htmlType='submit'>
      {type === 'create' && (loading ? 'Chờ chút...' : 'Tạo')}
      {type === 'update' && (loading ? 'Chờ chút...' : 'Cập nhật')}
    </Button>
  );
};

export default LoadingButton;
