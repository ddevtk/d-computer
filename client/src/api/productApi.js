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
  return await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getOne = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);
};

export const updateProduct = async (slug, product, token) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/product/${slug}`,
    product,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const danhGiaSp = async (productId, star, token) =>
  await axios.put(
    `${process.env.REACT_APP_API}/product/rating/${productId}`,
    { star },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getSanPhamLienQuan = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/product/related/${slug}`);
