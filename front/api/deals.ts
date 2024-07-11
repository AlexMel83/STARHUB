export interface DealResponse {
    status: number;
    data: {
        id: number;
        name: string;
        price: number;
        status: string;
        customer_id: number;
    };
  };
  
  export interface DealApi {
    getAllDeals(): Promise<DealResponse>;
    getDealById(id: number): Promise<DealResponse>;
    getDealByCustomerId(customer_id:number): Promise<DealResponse>;
  };
  
  export default function (instance: any): DealApi {
    return {
      getAllDeals(): Promise<DealResponse> {
        return instance.get("/deals");
      },
      getDealById(id: number): Promise<DealResponse> {
        return instance.get(`/deals/${id}`);
      },
      getDealByCustomerId(customer_id: number): Promise<DealResponse> {
        return instance.get(`/deals?customer_id=${customer_id}`);
      },
    };
  };
  