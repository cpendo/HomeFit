import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import Login from "../pages/auth/Login";
import Auth from "../pages/auth/Auth";
import NotFound from "../components/NotFound";
import Register from "../pages/auth/Register";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        index: true, 
        element: <Navigate to="login" replace /> 
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      }
    ]
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/wt:id",
    element: <p>Workout</p>
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
