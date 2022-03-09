import { Button } from 'antd';
import React from 'react';

const LoadingButton = ({ loading, type }) => {
  return (
    <Button type='primary' htmlType='submit'>
      {type === 'create' && loading ? 'Chờ chút...' : 'Tạo'}
    </Button>
  );
};

export default LoadingButton;
