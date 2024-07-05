export interface IUser {
    id: number;
    email: string;
    name: string;
    surname: string;
    phone: string;
    role: string;
    isactivated: boolean;
    social_login: boolean;
    facebook_id: string;
    google_id: string;
    picture: string;
    created_at: string;
    udated_at: string;
}

export interface UserState {
    isLoading: boolean;
    isAuthed: boolean;
    userRole: string;
    authUser: Record<string, unknown>; // используйте тип `Record<string, unknown>`, если структура данных может быть произвольной
    activeTabAuthUserMenu: string;
    menuOpen: boolean;
    manager: unknown; // уточните тип в зависимости от структуры данных менеджера
    user: unknown; // уточните тип в зависимости от структуры данных пользователя
    isMenuOpen: boolean;
  }