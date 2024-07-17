import type { ICustomer } from "~/types/deals.types";

interface CustomerResponse {
  data: ICustomer[];
  status: number;
  statusText: string;
  headers: any;
  config: any;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  avatar_url?: string;
  from_source?: string;
}

export interface CustomerCreate {
  name: string;
  email: string;
  avatar_url?: string;
  from_source?: string;
}

export interface CustomerApi {
  getCustomers(): Promise<CustomerResponse>;
  getCustomerById(id: number): Promise<CustomerResponse>;
  addCustomer(payload: CustomerCreate): Promise<CustomerResponse>;
  editCustomer(payload: Customer): Promise<CustomerResponse>;
}

export default function (instance: any): CustomerApi {
  return {
    getCustomers(): Promise<CustomerResponse> {
      return instance.get("/customers");
    },
    getCustomerById(id): Promise<CustomerResponse> {
      return instance.get(`/customers?id=${id}`);
    },
    addCustomer(payload): Promise<CustomerResponse> {
      return instance.post("/customers", payload);
    },
    editCustomer(payload): Promise<CustomerResponse> {
      return instance.put("/customers", payload);
    },
  };
}
