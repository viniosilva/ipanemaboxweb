import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import ListCustomers, {
  loader as listCustomersLoader,
} from "./pages/customers/ListCustomers";
import CreateCustomer, {
  action as CreateCustomerAction,
} from "./pages/customers/CreateCustomer";
import EditCustomer, {
  action as EditCustomerAction,
  loader as EditCustomerLoader,
} from "./pages/customers/EditCustomer";
import NotFoundError from "./pages/NotFoundError";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundError />,
  },
  {
    path: "/clientes",
    element: <ListCustomers />,
    loader: listCustomersLoader,
  },
  {
    path: "/clientes/novo",
    element: <CreateCustomer />,
    action: CreateCustomerAction,
  },
  {
    path: "/clientes/:id",
    element: <EditCustomer />,
    loader: EditCustomerLoader,
    action: EditCustomerAction,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
