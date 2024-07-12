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

  export interface DealResponseData {
    id: number;
    name: string;
    price: number;
    status: string;
    customer_id: number;
    customer: {};
  };

  export interface UpdateDealStatusPayload {
    id: number;
    status: string;
  }
  
  export interface DealApi {
    getAllDeals(): Promise<DealResponse>;
    getDealById(id: number): Promise<DealResponse>;
    getDealByCustomerId(customer_id:number): Promise<DealResponse>;
    updDeal(payload: UpdateDealStatusPayload): Promise<DealResponseData>
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
      updDeal(payload): Promise<DealResponseData> {
        return instance.put('/deals', payload);
      }
    };
  };
  