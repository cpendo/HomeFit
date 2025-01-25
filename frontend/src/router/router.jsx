import { createBrowserRouter } from "react-router";
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
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
