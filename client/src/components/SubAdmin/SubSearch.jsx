import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React from 'react';

const SubSearch = ({ setKeyword }) => {
  const changeHandler = (e) => {
    setKeyword(e.target.value.toLowerCase().trimEnd().trimStart());
  };
  return (
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
  );
};

export default SubSearch;
