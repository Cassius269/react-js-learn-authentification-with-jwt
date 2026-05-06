import { createBrowserRouter } from "react-router";
import App from "../App";
import { lazy } from "react";
import rootLoader from "../loaders/rootLoader";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

const Homepage = lazy(() => import("../pages/Homepage/Homepage"));
const Signin = lazy(() => import("../pages/Signin/Signin"));
const Signup = lazy(() => import("../pages/Signup/Signup"));
const Profile = lazy(() => import("../pages/Profile/Profile"));

export const ROUTER = createBrowserRouter([
  {
    path: "/",
    loader: rootLoader,
    hydrateFallbackElement: (
      <p className="text-center mt-5">Chargement des données du loader</p>
    ),
    Component: App,
    children: [
      {
        // path:'/',
        index: true, // la route correspond à celui du parent direct
        Component: Homepage,
      },
      {
        path: "inscription",
        Component: Signup,
      },
      {
        path: "connexion",
        Component: Signin,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
