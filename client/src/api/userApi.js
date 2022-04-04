import axios from 'axios';

export const createOrUpdateUser = async (authToken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/create-or-update-user`,
    {},
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

export const createOrder = async (paymentIntent, authToken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/create-order`,
    { paymentIntent },
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

export const getUserOrders = async (authToken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
