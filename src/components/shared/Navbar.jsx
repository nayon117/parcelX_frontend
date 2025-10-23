import { Link, NavLink } from "react-router";
import Logo from "./Logo";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const {user, logOut} = useAuth();

  const handleLogOut = () => {
    logOut()
    .then(()=>{})
    .catch(err=>console.log(err))
  }

  const navItems = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li> <NavLink to="/sendParcel">Send Parcel</NavLink></li>
      <li> <NavLink to="/coverage">Coverage</NavLink></li>
      {
        user && <> 
        <li> <NavLink to="/dashboard">Dashboard</NavLink></li> 
        </> 
      }
      <li> <NavLink to="/about">About</NavLink></li>
      <li> <NavLink to="/rider">Be a Rider</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-white shadow-sm mt-6 text-color3 rounded-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <span className="  text-xl">
          <Logo bg="white" />
        </span>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg font-semibold">
         {navItems}
        </ul>
      </div>
      <div className="navbar-end">
        {user ?
        <button onClick={handleLogOut} className="btn bg-color1 text-black">Log Out</button>
        :<Link to="/login" className="btn bg-color1 text-black">
          Login
        </Link>}
      </div>
    </div>
  );
};
export default Navbar;
