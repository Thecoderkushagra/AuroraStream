import axios from 'axios';
import { BACKEND_URL } from '../utils/constants';

const authService = {
    login: async (loginData) => {
        const response = await axios.post(
            `${BACKEND_URL}/user/auth/login`,
            loginData
        );
        return response.data;
    },
    signup: async (userData) => {
        const response = await axios.post(
            `${BACKEND_URL}/user/auth/signup`,
            userData
        );
        return response.data;
    },
    verifyOtp: async (otpData) => {
        const response = await axios.post(
            `${BACKEND_URL}/user/auth/varify-otp`,
            otpData
        );
        return response.data;
    },
    resendOtp: async (username) => {
        const response = await axios.post(
            `${BACKEND_URL}/user/auth/resend-otp?username=${username}`
        );
        return response.data;
    }
};

export default authService;
