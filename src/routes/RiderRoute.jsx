import { Navigate, useLocation } from "react-router";
import Loader from "../components/shared/Loader";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";

const RiderRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();
    const location = useLocation();

    if (loading || roleLoading) return <Loader />;

    if (!user || role !== 'rider') {
        return <Navigate to="/forbidden" state={{ from: location.pathname }} />
    }

  return children;
}
export default RiderRoute;
