import { useGetProfileQuery } from "../features/users/usersApi";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import LoadingPage from "../components/LoadingPage";

const ProtectedRoute = ({ children }) => {
  const { data, error, isLoading } = useGetProfileQuery();
  if (isLoading) {
    return <LoadingPage />;
  }

  console.log("ProtectedRoute - data:", data);
console.log("ProtectedRoute - error:", error);
console.log("ProtectedRoute - isLoading:", isLoading);
  if (error?.status === 401 || !data?.user ) {
    console.log(error);
    return <Navigate to="/auth" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProtectedRoute;
