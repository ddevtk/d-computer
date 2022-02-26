import axios from 'axios';

export const createOrUpdateUser = async (authToken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    {},
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

export const currentUser = async (authToken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

export const currentAdmin = async (authToken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/current-admin`,
    {},
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
