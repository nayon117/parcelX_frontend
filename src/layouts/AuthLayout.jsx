import { Outlet } from "react-router";
import authImage from "../assets/authImage.png";
import Logo from "../components/shared/Logo";

const AuthLayout = () => {
  return (
    <div className="p-12">
      <Logo bg="white" />
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-1">
          <img src={authImage} className="max-w-sm rounded-lg shadow-2xl" />
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
