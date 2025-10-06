import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const { user , logOut} = useAuth();
  const navigate = useNavigate();

  axiosSecure.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {  
        console.log("Unauthorized or Forbidden response - logging out user");
        const status = error.response?.status;
        if(status === 403) {
            navigate("/forbidden");
        } else if (status === 401) {
            logOut()
            .then(()=>{
                navigate("/login");
            })
            .catch((err)=>console.log(err));
        }

      return Promise.reject(error);
    }
  );

  return axiosSecure;
};
export default useAxiosSecure;
