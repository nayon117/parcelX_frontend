import axios from "axios";
import useAuth from "./useAuth";


const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000',
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  axiosSecure.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${user?.accessToken}`;
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  // axiosSecure.interceptors.response.use((response) => {
  //   return response;
  // }, (error) => {
  //   if (error.response && (error.response.status === 401 || error.response.status === 403)) {
  //     // handle unauthorized or forbidden responses
  //     console.log('Unauthorized or Forbidden response - logging out user');
  //     // e.g., logout user, redirect to login page, etc.
  //   }
  //   return Promise.reject(error);
  // });

  return axiosSecure;
}
export default useAxiosSecure;
