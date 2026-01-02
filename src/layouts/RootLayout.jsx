import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <div className="font-montserrat max-w-7xl mx-auto px-4 md:px-8 lg:px-12 bg-[#f8f8f9]">
      <Outlet />
      </div>
      <Footer/>
    </>
  );
};
export default RootLayout;
