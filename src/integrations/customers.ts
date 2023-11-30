import Customer from "../models/customer";

const customers: Customer[] = [
  {
    id: 1,
    name: "Mimoso",
    email: "mimo@email.com",
  },
  {
    id: 2,
    name: "Lola",
    email: "lola@email.com",
  },
];

export function createCustomer(data: Customer): Customer {
  const customer = new Customer();

  customer.id = customers.length + 1;
  customer.name = data.name;
  customer.email = data.email;

  customers.push(customer);

  return customer;
}

export function getCustomers(): Customer[] {
  return customers;
}

export function getCustomerByID(id: number): Customer | undefined {
  return customers.find((c) => c.id === id);
}

export function updateCustomer(data: Customer): Customer {
  const customer = customers.find((c) => c.id === data.id);
  if (!customer) throw new Error("Customer not found");

  customer.name = data.name;
  customer.email = data.email;

  return customer;
}

export function deleteCustomer(id: number) {
  const i = customers.findIndex((c) => c.id === id);
  if (i === -1) return;

  customers.splice(i, 1);
}
