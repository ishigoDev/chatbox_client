import axios from './axios';
export const login = async () =>{
    const response = await axios.get('/health-check');
    return response;
}