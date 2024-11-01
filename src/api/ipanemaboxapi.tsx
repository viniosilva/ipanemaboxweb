import { Customer, CustomersListResponse } from "../model/customer";

export async function getCustomersList(
  page: number,
  limit: number
): Promise<CustomersListResponse> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_IPANEMABOXAPI_URL}/v1/customers`
  );
  url.searchParams.append("page", page.toString());
  url.searchParams.append("limit", limit.toString());

  const response = await fetch(url);
  if (!response.ok) {
    console.error(`error on getCustomersList: ${response.body}`);
    throw new Error("Network response was not ok");
  }
  const data = await response.json();

  return data;
}

export async function getCustomerDetail(id: number): Promise<Customer> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_IPANEMABOXAPI_URL}/v1/customers/${id}`
  );
  const response = await fetch(url);
  if (!response.ok) {
    console.error(`error on getCustomerDetail: ${response.body}`);
    throw new Error("Network response was not ok");
  }
  const data = await response.json();

  return data;
}

export async function updateCustomer(customer: Customer): Promise<Customer> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_IPANEMABOXAPI_URL}/v1/customers/${customer.id}`
  );
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify({ name: customer.name }),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    console.error(`error on updateCustomer: ${response.body}`);
    throw new Error("Network response was not ok");
  }
  const data = await response.json();

  return data;
}

export async function createCustomer(customer: Customer): Promise<Customer> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_IPANEMABOXAPI_URL}/v1/customers`
  );
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ name: customer.name }),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    console.error(`error on createCustomer: ${response.body}`);
    throw new Error("Network response was not ok");
  }
  const data = await response.json();

  return data;
}

export async function deleteCustomer(id: number) {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_IPANEMABOXAPI_URL}/v1/customers/${id}`
  );
  const response = await fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    console.error(`error on deleteCustomer: ${response.body}`);
    throw new Error("Network response was not ok");
  }
}
