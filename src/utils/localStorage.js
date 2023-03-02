export const saveStorage = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (err) {
    return err;
  }
};
export const removeToken = () => {
  if (localStorage.getItem("token") !== null) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  }
};
export const getToken = () => {
  if (localStorage.getItem("token") !== null) {
    return localStorage.token;
  }
  removeToken();
  return false;
};
