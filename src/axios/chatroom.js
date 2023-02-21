import axios from './axios';
import { getToken } from '../utils/localStorage';

export const allUsers = () => {
  const token = getToken();
  const response = axios.get('/user/chatroom', { headers: { Authorization: `Bearer ${token}` } });
  return response;
};
