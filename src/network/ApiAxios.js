import axios from 'axios';
import globals from "../utils/globals";

const instance = axios.create({
    baseURL: globals.WS_BASE_URL,
    timeout: 10000
});

instance.interceptors.request.use((config) => {
    return config;
});

export const getAppConfig = async () => {
    return await instance.get('config');
};

export const createUser = async (email, password, accountType) => {
    return await instance.post('users', {email, password, type: accountType === 0 ? 'antrenor' : 'sportiv'});
};

