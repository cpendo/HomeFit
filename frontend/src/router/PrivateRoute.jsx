import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import { useVerifyTokenMutation } from "../features/users/usersApi";
import { useEffect, useState } from "react";
import LoadingPage from "../components/LoadingPage";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  const [verifyToken, { isLoading }] = useVerifyTokenMutation();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/auth");
      return;
    }

    const verify = async () => {
      try {
        await verifyToken({ token });
        setIsAllowed(true);
      } catch (error) {
        sessionStorage.removeItem("token");
        console.log("Error :", error);
        navigate("/auth");
      }
    };
    verify();
  }, [token, navigate, verifyToken]);

  if (isLoading) return <LoadingPage />;
  if (!isAllowed) return null;

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.element,
};

export default PrivateRoute;
