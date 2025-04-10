import { useGetStatusQuery } from "../features/users/usersApi";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const { data, error, isLoading } = useGetStatusQuery();
  if (isLoading) {
    return <div>Loading...</div>; 
  }


  if (error || !data || data.status !== "OK") {
    console.log(error)
    return <Navigate to="/auth" />;
  }

 return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProtectedRoute;
