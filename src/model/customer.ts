import Metadata from "./pagination";

export interface Customer {
  id: Number;
  name: String;
}

export interface CustomersListResponse {
  metadata: Metadata;
  data: Customer[];
}
