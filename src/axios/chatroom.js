import axios from "./axios";
import { getToken , getUserId } from "../utils/localStorage";

export const allUsers = () => {
  const token = getToken();
  const response = axios.get("/user/chatroom", { headers: { Authorization: `Bearer ${token}` } });
  return response;
};

export const fetchChat = (receiver) => {
  const token = getToken();
  const loggedInUser = getUserId();
  const response = axios.get(`/chat/${loggedInUser}/${receiver}`, { headers: { Authorization: `Bearer ${token}` } });
  return response;
};
