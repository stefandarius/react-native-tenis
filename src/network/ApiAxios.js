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

export const getLocalitatiByJudetId = async (id, pageNumber) => {
    return await instance.get(`localitati?filter[judet]=${id}&page=${pageNumber}`);
};

export const createSportiv = async (authorization, nume, prenume, data_nastere, nivel, greutate, inaltime, stare_sanatate, telefon, localitate, sex) => {
    return await instance.post('sportivi', {headers: {'Authorization': `Bearer ${authorization}`}, nume, prenume, data_nastere, nivel, greutate, inaltime, stare_sanatate, telefon, localitate, sex})
};

