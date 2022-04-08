import axios from 'axios';

export const getAllSubCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/subCategory`);

export const getSubCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/subCategory/${slug}`);

export const createSubCategory = async (name, parent, token) =>
  await axios.post(
    `${process.env.REACT_APP_API}/subCategory`,
    { name, parent },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const updateSubCategory = async (
  slug,
  name,
  newCategorySlug,
  oldParent,
  token
) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/subCategory/${slug}`,
    { name, newCategorySlug, oldParent },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteSubCategory = async (slug, token) =>
  await axios.delete(`${process.env.REACT_APP_API}/subCategory/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getSubsByCategoryId = async (parentId) =>
  await axios.get(
    `${process.env.REACT_APP_API}/subCategory/category/${parentId}`
  );
