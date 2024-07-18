import type { IComment } from "~/types/deals.types";

interface CommentResponse {
  data: IComment[];
  status: number;
  statusText: string;
  headers: any;
  config: any;
}

export interface CommentCreate {
  text: string;
  deal_id: number;
}

export interface CommentApi {
  getComment(deal_id: number): Promise<CommentResponse>;
  addComment(payload: CommentCreate): Promise<CommentResponse>;
}

export default function (instance: any): CommentApi {
  return {
    getComment(deal_id): Promise<CommentResponse> {
      return instance.get(`/comments?deal_id=${deal_id}`);
    },
    addComment(payload): Promise<CommentResponse> {
      return instance.post("/comments", payload);
    },
  };
}
