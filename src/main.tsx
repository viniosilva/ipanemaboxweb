import React from "react";
import ReactDOM from "react-dom/client";
import "./globalStyle.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Routes from "./Routes.tsx";

const router = createBrowserRouter([
  Routes.home,
  Routes.customers,
  Routes.addCustomer,
  Routes.editCustomer,
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
