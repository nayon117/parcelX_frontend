import { Link } from 'react-router';
import { FaBoxTissue } from "react-icons/fa";
const Logo = ({bg="white"}) => {
  return (
    <Link to="/">
     <div className='flex items-center'>
       <FaBoxTissue className='mr-4 text-color1 text-2xl' />
       <p className={`text-2xl font-bold -ml-2 ${bg == "black" ? "text-white" : "text-color3"} `}>parcelX</p>
    </div>
    </Link>
  )
}
export default Logo;

