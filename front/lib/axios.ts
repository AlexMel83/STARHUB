import axios from 'axios';

const config = useRuntimeConfig();
export const localhostApi = config.public.localhostApi;

const $api = axios.create({
    withCredentials: true,
    baseURL: localhostApi
});

$api.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

export default $api;