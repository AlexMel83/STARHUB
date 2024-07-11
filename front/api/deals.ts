export interface DealResponse {
    status: number;
    data: {
      user: {
        email: string;
        name: string;
        role: string;
        isactivated: boolean;
      };
      url: string;
    };
  };
  
  export interface DealApi {
    getDealById(id: number): Promise<DealResponse>;
    getAllDeals(): Promise<DealResponse>;
  }
  
  export default function (instance: any): DealApi {
    return {
      getDealById(id: number): Promise<DealResponse> {
        return instance.get(`/login/${id}`);
      },
      getAllDeals(): Promise<DealResponse> {
        return instance.get("/deals");
      },
    };
  }
  