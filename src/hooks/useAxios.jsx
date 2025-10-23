import axios from "axios";


const axiosPublic = axios.create({
  baseURL: 'https://parcel-x-server.vercel.app/api',
//   baseURL: 'http://localhost:5000/api',
});

const useAxios = () => {
  return axiosPublic;
}
export default useAxios;
