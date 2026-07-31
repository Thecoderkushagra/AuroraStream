import axios from 'axios';
import { BACKEND_URL } from '../utils/constants';
import Cookies from 'js-cookie';

const userService = {
  /**
   * Fetches the profile data for the currently logged-in viewer.
   * Maps to the /viewer/me endpoint in User-Service via the Gateway.
   */
  getViewerProfile: async () => {
    const token = Cookies.get('jwt');

    if (!token) {
      throw new Error('No authentication token found. Please log in.');
    }

    const response = await axios.get(`${BACKEND_URL}/user/viewer/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

export default userService;
