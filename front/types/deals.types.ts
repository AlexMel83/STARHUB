export interface IBaseField {
  created_at: string;
  id: string;
}

export interface ICustomer extends IBaseField {
  name: string;
  email: string;
  avatar_url: string;
  from_source?: string;
  documents?: string | null;
}

export interface IComment extends IBaseField {
  text: string;
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
}
