import Forbidden from "../../components/shared/Forbidden";
import Loader from "../../components/shared/Loader";
import useUserRole from "../../hooks/useUserRole";
import AdminDashboard from "./AdminDashboard";
import RiderDashboard from "./RiderDashboard";
import UserDashboard from "./UserDashboard";

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) return <Loader />;
  if (role === "user") return <UserDashboard />;
  else if (role === "admin") return <AdminDashboard />;
  else if (role === "rider") return <RiderDashboard />;
  else return <Forbidden />

};
export default DashboardHome;
