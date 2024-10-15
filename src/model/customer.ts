import Metadata from "./pagination";

export interface Customer {
  id: number;
  name: string;
}

export interface CustomersListResponse {
  metadata: Metadata;
  data: Customer[];
}
