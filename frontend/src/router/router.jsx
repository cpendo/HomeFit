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
import { TrainingPage, WorkoutDetailsPage1 } from "../pages/training-page";
import {
  DashboardLayout,
  LogsPage,
  SettingsPage,
  HomePage,
  UserProfile,
  WorkoutPage,
  AddWorkoutPage,
  WorkoutDetailsPage,
  AddLogPage,
} from "../pages/dashboard";
import { PrivateRoute, ProtectedRoute } from "./index";

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
        element: <WorkoutDetailsPage1 />,
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
        element: <HomePage />,
      },
      {
        path: "complete-profile",
        element: <UserProfile />,
      },
      {
        path: "workouts",
        element: <WorkoutPage />,
      },
      {
        path: "workouts/add",
        element: <AddWorkoutPage />,
      },
      {
        path: "workouts/:id",
        element: <WorkoutDetailsPage />,
      },
      { path: "logs", element: <LogsPage /> },
      {
        path: "logs/add",
        element: <AddLogPage />,
      },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
