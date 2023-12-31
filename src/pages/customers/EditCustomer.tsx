import { BaseSyntheticEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Routes from "../../Routes";
import SectionBox from "../../components/atoms/SectionBox";
import Layout from "../../components/templates/Layout";
import { setToast } from "../../components/atoms/Toast";
import CustomerForm from "../../components/organisms/CustomerForm";
import Customer from "../../models/customer";
import {
  deleteCustomer,
  getCustomerByID,
  updateCustomer,
} from "../../integrations/customers";

export default function EditCustomer() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [customer, setCustomer] = useState<Customer>({} as Customer);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const c = getCustomerByID(Number(id));
    if (!c) return;

    setCustomer(c);
    setTitle(`Cliente ${c.name}`);
  }, []);

  if (!customer.id) {
    return (
      <Layout>
        <SectionBox>
          <span>Carregando...</span>
        </SectionBox>
      </Layout>
    );
  }

  return (
    <Layout
      title={title}
      breadcrumbItems={[
        { name: "Início", to: Routes.home.path },
        { name: "Clientes", to: Routes.customers.path },
        { name: title },
      ]}
    >
      <SectionBox>
        <CustomerForm
          customer={customer}
          setCustomer={setCustomer}
          onSubmit={formOnSubmit}
          deleteOnClick={deleteOnClick}
        />
      </SectionBox>
    </Layout>
  );

  function formOnSubmit(e: BaseSyntheticEvent) {
    e.preventDefault();

    updateCustomer(customer);

    setToast({
      type: "success",
      message: "Cliente editado com sucesso",
    });

    navigate(Routes.customers.path);
  }

  function deleteOnClick(e: BaseSyntheticEvent) {
    e.preventDefault();

    const ok = confirm("Tem certeza que deseja remover o cliente?");
    if (!ok) return;

    deleteCustomer(customer.id);
    setToast({
      type: "success",
      message: "Cliente removido com sucesso",
    });

    navigate(Routes.customers.path);
  }
}
