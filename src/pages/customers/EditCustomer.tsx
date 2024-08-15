import { useState } from "react";
import { redirect, useLoaderData } from "react-router-dom";
import Layout from "../../templates/Layout";
import CustomerForm, { Customer } from "../../templates/CustomerForm";

interface Loader {
  customer: Customer;
}
export function loader({ params }: any): any {
  const customer: Customer = {
    id: Number(params.id),
    name: "John Doe",
    phones: [{ number: "1234567890", isPrimary: true }],
    addresses: [{ address: "Rua 123, 1234", isPrimary: true }],
  };
  return { customer };
}

export default function EditCustomer() {
  const { customer: data } = useLoaderData() as Loader;
  const customerName = data.name;
  const [customer, setCustomer] = useState<Customer>(data);

  return (
    <Layout>
      <header>
        <h2>Editar cliente {customerName}</h2>
      </header>
      <CustomerForm customer={customer} setCustomer={setCustomer} />
    </Layout>
  );
}

interface CustomerData {
  id: number;
  name: string;
  phones: Map<string, boolean>;
  addresses: Map<string, boolean>;
}

interface ActionProps {
  request: Request;
  params: { id: string };
}
export async function action({ request, params }: ActionProps): Promise<any> {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  let primaryIndex = findPrimaryIndex(data, "rdnPhone");
  const phones = getMapFromFormData(data, "phone", primaryIndex);

  primaryIndex = findPrimaryIndex(data, "rdnAddress");
  const addresses = getMapFromFormData(data, "address", primaryIndex);

  const customer: CustomerData = {
    id: Number(params.id),
    name: String(data.name),
    phones,
    addresses,
  };

  console.log(customer);
  return redirect(`/clientes`);
}

function findPrimaryIndex(
  data: { [k: string]: FormDataEntryValue },
  field: string
): number {
  return Number(Object.entries(data).find(([k]) => k === field)![1]);
}

function getMapFromFormData(
  data: { [k: string]: FormDataEntryValue },
  field: string,
  primaryIndex: number
): Map<string, boolean> {
  const map: Map<string, boolean> = new Map();
  Object.entries(data).forEach(([k, v]) => {
    if (!k.startsWith(field)) return;
    const i = Number(k.split("_")[1]);
    map.set(String(v), primaryIndex === i);
  });

  return map;
}
