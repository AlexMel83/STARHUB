export interface Item {
  id: number;
  price: number;
  title: string;
  imageUrl: string;
  isFavorite: boolean;
  isAdded: boolean;
}

export interface Favorite {
  id: number;
  price: number;
  title: string;
  imageUrl: string;
}

export interface ServerSneakersResponse {
  data: Item | Item[] | Favorite | Favorite[];
  status: number;
  statusText: string;
  headers: any;
  config: any;
}
