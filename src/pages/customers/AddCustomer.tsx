import { BaseSyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Routes from "../../Routes";
import SectionBox from "../../components/atoms/SectionBox";
import Layout from "../../components/templates/Layout";
import { setToast } from "../../components/molecules/Toast";
import CustomerForm from "../../components/organisms/CustomerForm";
import Customer from "../../models/customer";
import { createCustomer } from "../../integrations/customers";

export default function AddCustomer() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer>({} as Customer);

  return (
    <Layout
      title="Novo cliente"
      breadcrumbItems={[
        { name: "Início", to: Routes.home.path },
        { name: "Clientes", to: Routes.customers.path },
        { name: "Novo" },
      ]}
    >
      <SectionBox>
        <CustomerForm
          customer={customer}
          setCustomer={setCustomer}
          onSubmit={formOnSubmit}
        />
      </SectionBox>
    </Layout>
  );

  function formOnSubmit(e: BaseSyntheticEvent) {
    e.preventDefault();

    createCustomer({
      name: customer.name,
      email: customer.email,
    } as Customer);

    setToast({
      type: "success",
      message: "Cliente criado com sucesso",
    });

    navigate(Routes.customers.path);
  }
}
