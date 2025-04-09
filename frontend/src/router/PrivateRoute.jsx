import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  //const token = localStorage.getItem("verify_token"); // 1️⃣ Try to get the temporary JWT from localStorage
  const token = sessionStorage.getItem("verify_token");
  if (!token) return <Navigate to="/login" />; // 2️⃣ If there's no token, redirect the user to the login page

  try {
    const { exp } = jwtDecode(token) // 3️⃣ Decode the token to check its expiry timestamp (exp = UNIX time in seconds)
    const now = Date.now() / 1000 // 4️⃣ Get current time in seconds

    if (exp < now) {
      sessionStorage.removeItem('verify_token') // 5️⃣ Token expired? Clean it up...
      return <Navigate to="/login" /> // ...then redirect to login
    }

    return children;
  } catch (error) {
    console.log("Error", error)
    sessionStorage.removeItem('verify_token')
    return <Navigate to="/login" /> 
  }
};

PrivateRoute.propTypes = {
    children: PropTypes.element
}

export default PrivateRoute;
