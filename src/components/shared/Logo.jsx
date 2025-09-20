
import logo from '../../assets/logo.png'
const Logo = ({bg="white"}) => {
  return (
    <div className='flex items-end'>
       <img src={logo} alt="logo" />
       <p className={`text-2xl font-bold -ml-2 ${bg == "black" ? "text-white" : "text-color3"} `}>parcelX</p>
    </div>
  )
}
export default Logo;
