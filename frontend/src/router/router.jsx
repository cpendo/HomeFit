import { createBrowserRouter } from "react-router";
import App from "../App";
import NotFound from "../components/NotFound";
import LandingPage from "../pages/landing-page/LandingPage";
import HelpPage from "../pages/contact-us/HelpPage";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import { AuthLayout, Login, Register, VerifyUser } from "../pages/auth";
import {TrainingPage, WorkoutDetailsPage} from "../pages/training-page";

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
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "verify-user",
        element: (
          <PrivateRoute>
            <VerifyUser />
          </PrivateRoute>
        ),
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
      { path: "settings", element: <p>settings</p> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
