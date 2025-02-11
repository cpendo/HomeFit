import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "../pages/auth/Login";
import NotFound from "../components/NotFound";
import Register from "../pages/auth/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />
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
