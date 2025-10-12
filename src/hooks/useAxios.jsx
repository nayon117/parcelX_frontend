import axios from "axios";


const axiosPublic = axios.create({
  baseURL: 'https://parcel-x-server.vercel.app',
});

const useAxios = () => {
  return axiosPublic;
}
export default useAxios;
