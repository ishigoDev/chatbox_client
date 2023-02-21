import axios from './axios';

const signUp = async (data) => {
  const response = await axios.post('/user/create', data);
  return response;
};

export default signUp;
