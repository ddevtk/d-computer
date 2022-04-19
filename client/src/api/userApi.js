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

export const createOrderWithPayment = async (paymentIntent, authToken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/create-order-with-payment`,
    { paymentIntent },
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

export const createOrderCOD = async (authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/create-cod-order`,
    {},
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
};

export const getUserOrders = async (authToken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
export const wishlist = async (authToken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/wishlist`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
export const addToWishlist = async (authToken, productId) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/wishlist`,
    { productId },
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
export const removeFromWishlist = async (authToken, productId) =>
  await axios.put(
    `${process.env.REACT_APP_API}/user/wishlist/${productId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
