import { BaseSyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Routes from "../../Routes";
import Button from "../../components/atoms/Button";
import SectionBox from "../../components/atoms/SectionBox";
import Layout from "../../components/templates/Layout";
import { getCustomers } from "../../integrations/customers";
import { ToastBox, getToast } from "../../components/atoms/Toast";
import styles from "./customers.module.css";

export default function Customers() {
  const navigate = useNavigate();

  const customers = getCustomers();

  const [toasts, setToasts] = useState<JSX.Element[]>([]);
  useEffect(() => {
    getToast(setToasts);
  }, []);

  return (
    <>
      <ToastBox toasts={toasts} />
      <Layout
        title="Clientes"
        breadcrumbItems={[
          { name: "Início", to: Routes.home.path },
          { name: "Clientes" },
        ]}
      >
        <SectionBox classname={styles.customers}>
          <header>
            <Button category="primary" to={Routes.addCustomer.path}>
              Adicionar cliente
            </Button>
          </header>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr onClick={(e) => trOnClick(e, c.id)}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionBox>
      </Layout>
    </>
  );

  function trOnClick(e: BaseSyntheticEvent, id: number) {
    e.preventDefault();
    navigate(Routes.editCustomer.path.replace(":id", String(id)));
  }
}
