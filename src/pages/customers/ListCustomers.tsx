import { Link, useLoaderData } from "react-router-dom";
import Layout from "../../templates/Layout";

interface Customer {
  id: number;
  name: string;
  phone: string;
  address: string;
}

interface Loader {
  customers: Customer[];
}
export function loader(): any {
  const customers: Customer[] = [
    {
      id: 1,
      name: "John Doe",
      phone: "1234567890",
      address: "Rua 123, 1234",
    },
  ];
  return { customers };
}

export default function ListCustomers() {
  const { customers } = useLoaderData() as Loader;

  return (
    <Layout>
      <header>
        <h2>Clientes</h2>
        <div>
          <a href="/clientes/novo">Novo cliente</a>
        </div>
      </header>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Endereço</th>
          </tr>
        </thead>
        <tbody>
          {customers?.map((customer) => (
            <tr key={`customer_${customer.id}`}>
              <td>
                <Link to={`/clientes/${customer.id}`}>{customer.name}</Link>
              </td>
              <td>{customer.phone}</td>
              <td>{customer.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
