import axios from 'axios';

export const listOrder = async (authToken) =>
  await axios.get(`${process.env.REACT_APP_API}/order/list`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
export const getOrder = async (authToken, orderId) =>
  await axios.get(`${process.env.REACT_APP_API}/order/${orderId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

export const updateOrderStatus = async (authToken, orderId, orderStatus) =>
  await axios.put(
    `${process.env.REACT_APP_API}/order/update-status`,
    { orderId, orderStatus },
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
