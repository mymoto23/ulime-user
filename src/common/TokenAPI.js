import axios from 'axios';
import {API_URL} from "../static/constants";


export const verifyToken = async () => {
  const token = sessionStorage.getItem('token');
  if (token) {
    try {
      const config = {
        headers: {
          'x-access-token': token
        }
      };
      return await axios.get(`${API_URL}/auth/verifyToken`, config);
    } catch(e) {
      alert(`Error verifying token: ${e.message}`);
    }
  } else {
    return false;
  }
};
