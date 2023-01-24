import axios from './axios';
export const login = async (data) =>{
    const response = await axios.post('/user/sign-in',data);
    return response;
}