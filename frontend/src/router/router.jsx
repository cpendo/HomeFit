import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "../pages/auth/Login";
import NotFound from "../components/NotFound";
import Register from "../pages/auth/Register";
import LandingPage from "../pages/landing-page/LandingPage";
import HelpPage from "../pages/contact-us/HelpPage";
import TrainingPage from "../pages/training/TrainingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "get-help",
        element: <HelpPage />,
      },
      {
        path: "training",
        element: <TrainingPage />,
      },
      {
        path: "training/workout/:id",
        element: <p>Workout ID</p>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
