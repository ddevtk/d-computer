import { Button, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import * as couponApi from '../../api/couponApi';

const CouponList = ({ createLoading }) => {
  const [couponList, setCouponList] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadCoupon = () => {
    setLoading(true);
    couponApi.getCoupons().then((res) => {
      setCouponList(
        res.data.map((item) => {
          return {
            key: item._id,
            discount: item.discount,
            name: item.name,
            expireIn: new Date(item.expireIn).toLocaleDateString(),
          };
        })
      );
      setLoading(false);
    });
  };
  useEffect(() => {
    loadCoupon();
  }, []);
  useEffect(() => {
    if (!createLoading) {
      loadCoupon();
    }
  }, [createLoading]);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      render: (discount) => <span>{discount} %</span>,
    },
    {
      title: 'Expire Day',
      dataIndex: 'expireIn',
      key: 'expireIn',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size='middle'>
          <Button>Edit</Button>
          <Button>Delete</Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={couponList}
        scroll={{ x: 450 }}
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default CouponList;
