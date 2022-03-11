import axios from 'axios';

export const createProduct = async (product, token) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getProductPerPage = async (current, limit) =>
  await axios.get(
    `${process.env.REACT_APP_API}/product?limit=${limit}&page=${current}`
  );

export const deleteProduct = async (slug, token) => {
  return axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
