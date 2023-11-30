import App from "./App";
import AddCustomer from "./pages/customers/AddCustomer";
import Customers from "./pages/customers/Customers";
import EditCustomer from "./pages/customers/EditCustomer";

export default {
  home: {
    path: "/",
    element: <App />,
  },
  customers: {
    path: "/clientes",
    element: <Customers />,
  },
  addCustomer: {
    path: "/clientes/novo",
    element: <AddCustomer />,
  },
  editCustomer: {
    path: "/clientes/:id",
    element: <EditCustomer />,
  }
};
