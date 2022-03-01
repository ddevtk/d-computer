import axios from 'axios';

export const getAllCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/categories`);

export const getCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/categories/${slug}`);

export const createCategory = async (name, token) =>
  await axios.post(
    `${process.env.REACT_APP_API}/categories`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const updateCategory = async (slug, name, token) =>
  await axios.put(
    `${process.env.REACT_APP_API}/categories/${slug}`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const deleteCategory = async (slug, token) =>
  await axios.delete(`${process.env.REACT_APP_API}/categories/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
