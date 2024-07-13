  export interface CommentResponse {
    id: number;
    text: string;
    deal_id: number;
    user_id: number;
  }

  export interface CommentApi {
    getComment(deal_id: number): Promise<CommentResponse>;
  };
  
  export default function (instance: any): CommentApi {
    return {
      getComment(deal_id): Promise<CommentResponse> {
        return instance.get(`/comments?deal_id=${deal_id}`);
      }
    };
  };
  