import axios from './axios';

export default async (data) => {
  const response = await axios.post('/user/sign-in', data);
  return response;
};
