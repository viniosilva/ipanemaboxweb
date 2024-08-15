import Layout from "../../templates/Layout";
import CustomerForm, { Customer } from "../../templates/CustomerForm";
import { useState } from "react";
import { redirect } from "react-router-dom";

export default function CreateCustomer() {
  const [customer, setCustomer] = useState<Customer>({
    id: 0,
    name: "",
    phones: [{ number: "", isPrimary: true }],
    addresses: [{ address: "", isPrimary: true }],
  });

  return (
    <Layout>
      <header>
        <h2>Novo cliente</h2>
      </header>
      <CustomerForm customer={customer} setCustomer={setCustomer} />
    </Layout>
  );
}

interface CustomerData {
  name: string;
  phones: { phone: string; main: boolean }[];
  addresses: { address: string; main: boolean }[];
}

interface ActionProps {
  request: Request;
}
export async function action({ request }: ActionProps): Promise<any> {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  let primaryIndex = findPrimaryIndex(data, "rdnPhone");
  const phones = getFromFormData(data, "phone", primaryIndex);

  primaryIndex = findPrimaryIndex(data, "rdnAddress");
  const addresses = getFromFormData(data, "address", primaryIndex);

  const customer: CustomerData = {
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

function getFromFormData(
  data: { [k: string]: FormDataEntryValue },
  field: string,
  primaryIndex: number
): any[] {
  const arr: any[] = [];
  Object.entries(data).forEach(([k, v]) => {
    if (!k.startsWith(field)) return;
    const i = Number(k.split("_")[1]);
    arr.push({ field: String(v), main: primaryIndex === i });
  });

  return arr;
}
