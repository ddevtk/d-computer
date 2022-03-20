import axios from 'axios';

export const cmtSp = async (productId, comment, token) =>
  await axios.post(
    `${process.env.REACT_APP_API}/comment/${productId}`,
    { comment },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
export const listCmtByProductId = async (slugProduct) =>
  await axios.get(`${process.env.REACT_APP_API}/comment/${slugProduct}`);
