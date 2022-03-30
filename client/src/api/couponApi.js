import axios from 'axios';

export const getCoupons = async () =>
  await axios.get(`${process.env.REACT_APP_API}/coupon/list`);

export const removeCoupon = async (couponId, token) => {
  return await axios.delete(
    `${process.env.REACT_APP_API}/coupon/delete/${couponId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createCoupon = async (name, expireIn, discount, token) =>
  await axios.post(
    `${process.env.REACT_APP_API}/coupon/create`,
    {
      name,
      expireIn,
      discount,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
