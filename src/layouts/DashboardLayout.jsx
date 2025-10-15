import { NavLink, Outlet } from "react-router";
import Logo from "../components/shared/Logo";
import useUserRole from "../hooks/useUserRole";
import Loader from "../components/shared/Loader";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return <Loader />;
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-color2 w-full lg:hidden">
          <div className="flex-none ">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
        </div>
        {/* Page content here */}
        <div className="text-black">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-color2 text-base-content min-h-full w-80 p-4 text-lg font-semibold space-y-2">
          {/* Sidebar content here */}
          <Logo bg="black" />
          <hr className="my-4 border-gray-300" />
    
             {
            !roleLoading && role === "user" &&  <li>
                <NavLink to="/dashboard/userDashboard" className="flex items-center space-x-2">
                  <span>🏠</span>
                  <span>Home</span>
                </NavLink>
              </li>
             }
             {
            !roleLoading && role === "rider" &&  <li>
                <NavLink to="/dashboard/riderDashboard" className="flex items-center space-x-2">
                  <span>🏠</span>
                    <span>Home</span>
                </NavLink>
              </li>
             }

             {
            !roleLoading && role === "admin" &&  <li>
                <NavLink to="/dashboard/adminDashboard" className="flex items-center space-x-2">
                  <span>🏠</span>
                  <span>Home</span>
                </NavLink>
              </li>
             }

              <li>
                <NavLink
                  to="/dashboard/myParcels"
                  className="flex items-center space-x-2"
                >
                  <span>📦</span>
                  <span>My Parcels</span>
                </NavLink>
              </li>
              {/* paymentHistory */}
              <li>
                <NavLink
                  to="/dashboard/paymentHistory"
                  className="flex items-center space-x-2"
                >
                  <span>💳</span>
                  <span>Payment History</span>
                </NavLink>
              </li>

              {/* update profile */}
              <li>
                <NavLink
                  to="/dashboard/updateProfile"
                  className="flex items-center space-x-2"
                >
                  <span>👤</span>
                  <span>Update Profile</span>
                </NavLink>
              </li>

         {/* rider routes */}
         {
            !roleLoading && role === "rider" && (
                <>
                <li>
                  <NavLink
                    to="/dashboard/pending-deliveries"
                    className="flex items-center space-x-2"
                  >
                    <span>📦</span>
                    <span>Pending Deliveries</span>
                  </NavLink>
                </li>

                {/* completed deliveries */}
                <li>
                  <NavLink
                    to="/dashboard/completed-deliveries"
                    className="flex items-center space-x-2"
                  >
                    <span>✅</span>
                    <span>Completed Deliveries</span>
                  </NavLink>
                </li>
                {/* my earnings */}
                <li>
                  <NavLink
                    to="/dashboard/my-earnings"
                    className="flex items-center space-x-2"
                  >
                    <span>💰</span>
                    <span>My Earnings</span>
                  </NavLink>
                </li>
              </>
            )
         }

          {/* admin routes */}
          {!roleLoading && role === "admin" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/assign-rider"
                  className="flex items-center space-x-2"
                >
                  <span>🚚</span>
                  <span>Assign Rider</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/active-riders"
                  className="flex items-center space-x-2"
                >
                  <span>🟢</span>
                  <span>Active Riders</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/pending-riders"
                  className="flex items-center space-x-2"
                >
                  <span>🟡</span>
                  <span>Pending Riders</span>
                </NavLink>
              </li>

              {/* make admin  */}
              <li>
                <NavLink
                  to="/dashboard/makeAdmin"
                  className="flex items-center space-x-2"
                >
                  <span>👮‍♂️</span>
                  <span>Make Admin</span>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
export default DashboardLayout;
