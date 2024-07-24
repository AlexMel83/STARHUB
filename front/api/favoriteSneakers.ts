interface FavoriteSneakersResponse {
  data: FavoriteSneakers[];
  status: number;
  statusText: string;
  headers: any;
  config: any;
}

interface FavoriteSneakers {
  id: number;
  user_id: number;
  sneaker_id: number;
}

export interface FavoriteSneakersApi {
  getFavoriteSneakers(): Promise<FavoriteSneakersResponse>;
  addFavoriteSneakers(id: number): Promise<FavoriteSneakersResponse>;
  removeFavoriteSneakers(id: number): Promise<FavoriteSneakersResponse>;
}

export default function (instance: any): FavoriteSneakersApi {
  return {
    getFavoriteSneakers(): Promise<FavoriteSneakersResponse> {
      return instance.get(`/favoriteSneakers`);
    },
    addFavoriteSneakers(id: number): Promise<FavoriteSneakersResponse> {
      return instance.post(`/favoriteSneakers?id=${id}`);
    },
    removeFavoriteSneakers(id: number): Promise<FavoriteSneakersResponse> {
      return instance.delete(`/favoriteSneakers?id=${id}`);
    },
  };
}
