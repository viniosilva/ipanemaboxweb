import Routes from "../../Routes";
import Button from "../atoms/Button";
import Form from "../atoms/Form";
import InputBox from "../atoms/InputBox";
import Input from "../atoms/Input";
import FormActions from "../atoms/FormActions";
import { BaseSyntheticEvent, SetStateAction } from "react";
import Customer from "../../models/customer";
import styles from "./customerForm.module.css";
import concatClassNames from "../../utils/concatClassNames";

interface Props {
  customer: Customer;
  setCustomer: (value: SetStateAction<Customer>) => void;
  onSubmit: (e: BaseSyntheticEvent) => void;
  deleteOnClick?: (e: BaseSyntheticEvent) => void;
  classname?: string;
}

export default function CustomerForm({
  customer,
  setCustomer,
  onSubmit,
  deleteOnClick,
  classname,
}: Props) {
  const cls = concatClassNames([classname, styles.form]);

  return (
    <Form classname={cls} onSubmit={onSubmit}>
      <InputBox>
        <label htmlFor="name">Nome</label>
        <Input
          type="text"
          name="name"
          placeholder="Nome Sobrenome"
          required={true}
          value={customer.name}
          onchange={(e: BaseSyntheticEvent) => {
            setCustomer({ ...customer, name: e.target.value });
          }}
        />
      </InputBox>
      <InputBox>
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          name="email"
          placeholder="seu@email.com.br"
          required={true}
          value={customer.email}
          onchange={(e: BaseSyntheticEvent) => {
            setCustomer({ ...customer, email: e.target.value });
          }}
        />
      </InputBox>
      <FormActions classname={styles.actions}>
        <Button type="submit" category="primary">
          Salvar
        </Button>

        {deleteOnClick ? (
          <Button type="button" category="danger" onClick={deleteOnClick}>
            Remover
          </Button>
        ) : (
          <></>
        )}

        <Button
          classname={styles.back}
          type="button"
          category="secondary"
          to={Routes.customers.path}
        >
          Voltar
        </Button>
      </FormActions>
    </Form>
  );
}
