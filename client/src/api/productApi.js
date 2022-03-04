import axios from 'axios';

export const createProduct = async (product, token) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
