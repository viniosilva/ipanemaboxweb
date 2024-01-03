import { BaseSyntheticEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Routes from "../../Routes";
import SectionBox from "../../components/atoms/SectionBox";
import Layout from "../../components/templates/Layout";
import { setToast } from "../../components/molecules/Toast";
import CustomerForm from "../../components/organisms/CustomerForm";
import Customer from "../../models/customer";
import {
  deleteCustomer,
  getCustomerByID,
  updateCustomer,
} from "../../integrations/customers";
import Confirm from "../../components/molecules/Confirm";

export default function EditCustomer() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [customer, setCustomer] = useState<Customer>({} as Customer);
  const [title, setTitle] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

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
    <>
      <Confirm
        text="Tem certeza que deseja remover o cliente?"
        onConfirm={deleteOnConfirm}
        onReject={deleteOnReject}
        hidden={!showConfirm}
      />
      <Layout
        title={title}
        breadcrumbItems={[
          { name: "Início", to: Routes.home.path },
          { name: "Clientes", to: Routes.customers.path },
          { name: "Editar" },
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
    </>
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
    setShowConfirm(true);
  }

  function deleteOnConfirm(e: BaseSyntheticEvent) {
    e.preventDefault();

    deleteCustomer(customer.id);
    setToast({
      type: "success",
      message: "Cliente removido com sucesso",
    });

    navigate(Routes.customers.path);
  }

  function deleteOnReject(e: BaseSyntheticEvent) {
    e.preventDefault();
    setShowConfirm(false);
  }
}
