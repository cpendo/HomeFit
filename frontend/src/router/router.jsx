import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "../pages/auth/Login";
import NotFound from "../components/NotFound";
import Register from "../pages/auth/Register";
import LandingPage from "../pages/landing-page/LandingPage";
import HelpPage from "../pages/contact-us/HelpPage";
import TrainingPage from "../pages/training-page/TrainingPage";
import WorkoutDetailsPage from "../pages/training-page/WorkoutDetailsPage";
import VerifyUser from "../pages/auth/VerifyUser";
import DashboardLayout from "../pages/dashboard/DashboardLayout";

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
        element: <WorkoutDetailsPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <p>Dash Home</p>,
      },
      {
        path: "workouts",
        element: <p>Workouts</p>,
      },
      {
        path: "sets",
        element: <p>sets</p>,
      },
      { path: "logs", element: <p>logs</p> },
      {path: "settings", element: <p>settings</p>}
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/login/:token",
    element: <VerifyUser />,
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
