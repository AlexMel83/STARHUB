import type { EnumStatus } from "~/types/deals.types";

export interface ICard {
  id: number;
  name: string;
  price: number;
  created_at: string;
  customer: string;
  status: string;
}

export interface IColumn {
  id: EnumStatus;
  name: string;
  items: ICard[];
}
