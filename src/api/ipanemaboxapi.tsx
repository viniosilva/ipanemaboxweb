import { CustomersListResponse } from "../model/customer";

export async function getCustomersList(page: number, limit: number): Promise<CustomersListResponse> {
  const url = new URL(`${process.env.NEXT_PUBLIC_IPANEMABOXAPI_URL}/v1/customers`);
  url.searchParams.append("page", page.toString());
  url.searchParams.append("limit", limit.toString());

  const response = await fetch(url);
  if (!response.ok) {
    console.error(`error on getCustomersList: ${response.body}`);
    throw new Error("Network response was not ok");
  }
  const data = await response.json();

  return data;
};