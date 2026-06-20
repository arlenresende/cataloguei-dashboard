import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import AuthLayout from "./pages/AuthPages/AuthPageLayout";

import Home from "./pages/Dashboard/Home";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";

import UserProfiles from "./pages/UserProfiles";
import Calendar from "./pages/Calendar";
import Blank from "./pages/Blank";

import FormElements from "./pages/Forms/FormElements";
import BasicTables from "./pages/Tables/BasicTables";

import Alerts from "./pages/UiElements/Alerts";
import Avatars from "./pages/UiElements/Avatars";
import Badges from "./pages/UiElements/Badges";
import Buttons from "./pages/UiElements/Buttons";
import Images from "./pages/UiElements/Images";
import Videos from "./pages/UiElements/Videos";

import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import { useAuth } from "./hooks/useAuth";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function RedirectIfAuth({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <Home /> },

      { path: "profile", element: <UserProfiles /> },
      { path: "calendar", element: <Calendar /> },
      { path: "blank", element: <Blank /> },

      { path: "form-elements", element: <FormElements /> },

      { path: "basic-tables", element: <BasicTables /> },

      { path: "alerts", element: <Alerts /> },
      { path: "avatars", element: <Avatars /> },
      { path: "badge", element: <Badges /> },
      { path: "buttons", element: <Buttons /> },
      { path: "images", element: <Images /> },
      { path: "videos", element: <Videos /> },

      { path: "line-chart", element: <LineChart /> },
      { path: "bar-chart", element: <BarChart /> },
    ],
  },
  {
    path: "/",
    element: (
      <RedirectIfAuth>
        <AuthLayout />
      </RedirectIfAuth>
    ),
    children: [
      { path: "login", element: <SignIn /> },
      { path: "registrar", element: <SignUp /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);