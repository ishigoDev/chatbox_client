import axios from "./axios";
import { getToken } from "../utils/localStorage";

const signOut = async () => {
    const token = getToken();    
    const response = await axios.get("/user/sign-out", { headers: { Authorization: `Bearer ${token}` } });
    return response;
};

export default signOut;
