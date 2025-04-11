import { useGetProfileQuery } from "../features/users/usersApi";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import LoadingPage from "../components/LoadingPage";

const ProtectedRoute = ({ children }) => {
  const { data, error, isLoading } = useGetProfileQuery();
  if (isLoading) {
    return <LoadingPage />;
  }

  if (error || !data || data.status !== "OK") {
    console.log(error);
    return <Navigate to="/auth" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProtectedRoute;
