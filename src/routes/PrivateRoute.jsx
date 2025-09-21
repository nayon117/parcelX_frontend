import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
export default PrivateRoute;
