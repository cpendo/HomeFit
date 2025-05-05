import { useGetProfileQuery } from "../features/users/usersApi";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import LoadingPage from "../components/LoadingPage";

const ProtectedRoute = ({ children }) => {
  const { data, error, isLoading } = useGetProfileQuery();
  const location = useLocation();
  if (isLoading) {
    return <LoadingPage />;
  }

  if (error?.status === 401 || !data?.user ) {
    console.log(error);
    return <Navigate to="/auth" />;
  }

  const isOnProfilePage = location.pathname === "/dashboard/complete-profile";

  // If user has no profile and isn't already on profile page, force them there
  if (!data.hasProfile && !isOnProfilePage) {
    return <Navigate to="/dashboard/complete-profile" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProtectedRoute;
