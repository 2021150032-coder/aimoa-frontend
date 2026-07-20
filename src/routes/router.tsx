import { createBrowserRouter } from "react-router-dom";

import Layout from "../components/layout/Layout";

import Home from "../pages/Home";
import Search from "../pages/Search";
import Tool from "../pages/Tool";
import Workflow from "../pages/Workflow";
import Compare from "../pages/Compare";
import Login from "../pages/Login";
import Admin from "../pages/Admin";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/tool/:id",
        element: <Tool />,
      },
      {
        path: "/workflow/:id",
        element: <Workflow />,
      },
      {
        path: "/compare",
        element: <Compare />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);