import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem("verify_token");
  if (!token) return <Navigate to="/auth" />; 

  try {
    const { exp } = jwtDecode(token) 
    const now = Date.now() / 1000 

    if (exp < now) {
      sessionStorage.removeItem('verify_token')
      return <Navigate to="/auth" /> 
    }

    return children;
  } catch (error) {
    console.log("Error", error)
    sessionStorage.removeItem('verify_token')
    return <Navigate to="/auth" /> 
  }
};

PrivateRoute.propTypes = {
    children: PropTypes.element
}

export default PrivateRoute;
