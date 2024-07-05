import $api from './axios';
import type { AxiosResponse } from 'axios';
import type { IUser } from './types/IUser';

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('users');
    }
}