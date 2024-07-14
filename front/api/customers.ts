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
  avatar_url: string;
  from_source: string;
  created_at: string;
  updated_at: string;
}

  export interface CustomerCreate {
    name: string;
    email: string;
    avatar_url: string;
    from_source: string;
  }

  export interface CustomerApi {
    getCustomers(): Promise<CustomerResponse>;
    addCustomer(payload: CustomerCreate): Promise<CustomerResponse>;
  };
  
  export default function (instance: any): CustomerApi {
    return {
      getCustomers(): Promise<CustomerResponse> {
        return instance.get('/customers');
      },
      addCustomer(payload): Promise<CustomerResponse> {
        return instance.post('/customers', payload);
      },
    };
  };
  