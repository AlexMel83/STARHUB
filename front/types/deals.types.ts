export interface IBaseField {
  created_at: string;
  id: number;
}

export interface ICustomer extends IBaseField {
  name: string;
  email: string;
  avatar_url: string;
  from_source?: string;
  documents?: string | null;
}

export interface IComment {
  id: number;
  text: string;
  deal_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export enum EnumStatus {
  "todo" = "todo",
  "to-be-agreed" = "to-be-agreed",
  "in-progress" = "in-progress",
  "produced" = "produced",
  "done" = "done",
}

export interface IDeal {
  id: number;
  name: string;
  price: number;
  status: string;
  created_at: string;
  customer: {
    id: number;
    name: string;
    email: string;
    avatar_url: string;
    from_source: string;
    created_at: string;
    updated_at: string;
  };
  comments: IComment[];
}
