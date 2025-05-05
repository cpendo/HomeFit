import { createBrowserRouter } from "react-router";
import App from "../App";
import NotFound from "../components/NotFound";
import LandingPage from "../pages/landing-page/LandingPage";
import HelpPage from "../pages/contact-us/HelpPage";
import {
  AuthLayout,
  Login,
  Register,
  VerifyUser,
  ForgotPassword,
  ResetPassword,
} from "../pages/auth";
import { TrainingPage, WorkoutDetailsPage } from "../pages/training-page";
import {
  DashboardLayout,
  LogsPage,
  SetsPage,
  SettingsPage,
} from "../pages/dashboard";
import { PrivateRoute, ProtectedRoute } from "./index";
import DashLayout from "../pages/dash/DashLayout";
import HomePage from "../pages/dash/HomePage";

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
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <p>Dash Home</p>,
      },
      {
        path: "workouts",
        element: <p>Workouts</p>,
      },
      { path: "sets", element: <SetsPage /> },
      { path: "logs", element: <LogsPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
