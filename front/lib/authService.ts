import $api from './axios';
import { AxiosResponse } from 'axios';
import type { AuthResponce } from './types/AuthResponse';

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponce>> {
        return $api.post<AuthResponce>('/login', {email, password});
    };

    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponce>> {
        return $api.post<AuthResponce>('/registration', {email, password});
    };

    static async logout(): Promise<AxiosResponse<AuthResponce>> {
        return $api.post('/logout');
    };
};

