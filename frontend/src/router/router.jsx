import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "../pages/auth/Login";
import NotFound from "../components/NotFound";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Login />,
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
