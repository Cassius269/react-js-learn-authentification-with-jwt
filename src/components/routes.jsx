import { createBrowserRouter } from "react-router";
import App from "../App";
import { lazy } from "react";

const Homepage = lazy(() => import("../pages/Homepage/Homepage"));
const Signin = lazy(() => import("../pages/Signin/Signin"));
const Signup = lazy(() => import("../pages/Signup/Signup"));

export const ROUTER = createBrowserRouter([
  {
    path: "/",
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
    ],
  },
]);
