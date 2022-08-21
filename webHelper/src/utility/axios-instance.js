import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: process.env.API_SERVER_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

// Add a request interceptor
AxiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

// Add a response interceptor
AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.data) {
      const payload = {
        code: error.response.status,
        message: error.response.data.message || error.response.data.error || 'Something went wrong, please try again later',
      };

      return Promise.reject(payload);
    }

    return Promise.reject(error);
  },
);

export default AxiosInstance;
