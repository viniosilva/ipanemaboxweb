import { CustomersListResponse } from "../model/customer";

export async function getCustomersList(): Promise<CustomersListResponse> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_IPANEMABOXAPI_URL}/v1/customers`);
    if (!response.ok) {
      console.error(`error on getCustomersList: ${response.body}`);
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    
    return data;
  };