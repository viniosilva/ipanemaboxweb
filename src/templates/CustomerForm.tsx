import { BaseSyntheticEvent, Dispatch, SetStateAction } from "react";
import { Form, Link } from "react-router-dom";

export interface Customer {
  id: number;
  name: string;
  phones: {
    number: string;
    isPrimary: boolean;
  }[];
  addresses: {
    address: string;
    isPrimary: boolean;
  }[];
}

interface Props {
  customer: Customer;
  setCustomer: Dispatch<SetStateAction<Customer>>;
}

export default function CustomerForm({ customer, setCustomer }: Props) {
  return (
    <Form method="post">
      <div>
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          name="name"
          value={customer.name}
          onChange={(e: BaseSyntheticEvent) => {
            customer.name = e.target.value;
            setCustomer({ ...customer });
          }}
        />
      </div>
      <table className="phones">
        <caption>
          <span>Telefones</span>
          <div>
            <input
              type="button"
              value="Adicionar telefone"
              onClick={() => {
                customer.phones.push({ number: "", isPrimary: false });
                setCustomer({ ...customer });
              }}
            />
          </div>
        </caption>
        <thead>
          <tr>
            <th>Número</th>
            <th>Principal</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {customer.phones.map((phone, i) => (
            <tr key={`phone_${i}`}>
              <td>
                <input
                  type="text"
                  name={`phone_${i}`}
                  value={phone.number}
                  onChange={(e: BaseSyntheticEvent) => {
                    customer.phones[i].number = e.target.value;
                    setCustomer({ ...customer });
                  }}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name="rdnPhone"
                  checked={phone.isPrimary}
                  value={i}
                  onChange={() => {
                    customer.phones.forEach((p) => (p.isPrimary = false));
                    customer.phones[i].isPrimary = true;
                    setCustomer({ ...customer });
                  }}
                />
              </td>
              <td>
                {i == 0 ? (
                  "-"
                ) : (
                  <input
                    type="button"
                    value="Cancelar"
                    onClick={() => {
                      if (customer.phones[i].isPrimary) {
                        customer.phones[0].isPrimary = true;
                      }

                      delete customer.phones[i];
                      setCustomer({ ...customer });
                    }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="addresses">
        <caption>
          <span>Endereços</span>
          <div>
            <input
              type="button"
              value="Adicionar endereço"
              onClick={() => {
                customer.addresses.push({ address: "", isPrimary: false });
                setCustomer({ ...customer });
              }}
            />
          </div>
        </caption>
        <thead>
          <tr>
            <th>Endereço</th>
            <th>Principal</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {customer.addresses.map((address, i) => (
            <tr key={`address_${i}`}>
              <td>
                <textarea
                  name={`address_${i}`}
                  value={address.address}
                  onChange={(e: BaseSyntheticEvent) => {
                    customer.addresses[i].address = e.target.value;
                    setCustomer({ ...customer });
                  }}
                ></textarea>
              </td>
              <td>
                <input
                  type="radio"
                  name="rdnAddress"
                  checked={address.isPrimary}
                  value={i}
                  onChange={() => {
                    customer.addresses.forEach((a) => (a.isPrimary = false));
                    customer.addresses[i].isPrimary = true;
                    setCustomer({ ...customer });
                  }}
                />
              </td>
              <td>
                {i == 0 ? (
                  "-"
                ) : (
                  <input
                    type="button"
                    value="Cancelar"
                    onClick={() => {
                      if (customer.addresses[i].isPrimary) {
                        customer.addresses[0].isPrimary = true;
                      }

                      delete customer.addresses[i];
                      setCustomer({ ...customer });
                    }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <input type="submit" value="Salvar" />
        <Link to="/clientes">Voltar</Link>
      </div>
    </Form>
  );
}
