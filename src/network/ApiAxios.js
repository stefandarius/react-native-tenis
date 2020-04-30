import axios from 'axios';
import globals from "../utils/globals";
import AsyncStorage from "@react-native-community/async-storage";

const getData = async () => {
    try {
        return await AsyncStorage.getItem('@user');
    } catch (e) {
        return null;
    }
};

const instance = axios.create({
    baseURL: globals.WS_BASE_URL,
    timeout: 10000
});

instance.interceptors.request.use(async (config) => {
    const user = JSON.parse(await getData());
    const token = (user === null ? null : user.auth_key);
    config.headers.Authorization = (token ? `Bearer ${token}` : '');
    return config;
});

export const getAppConfig = async () => (
    await instance.get('config')
);

export const createUser = async (email, password, accountType) => (
    await instance.post('users', {email, password, type: accountType === 0 ? 'antrenor' : 'sportiv'})
);

export const getLocalitatiByJudetId = async (id, pageNumber) => (
    await instance.get(`localitati?filter[judet]=${id}&page=${pageNumber}`)
);

export const createSportiv = async (nume, prenume, data_nastere, nivel, greutate, inaltime, stare_sanatate, telefon, localitate, sex) => (
    await instance.post('sportivi', {nume, prenume, data_nastere, nivel, greutate, inaltime, stare_sanatate, telefon, localitate, sex})
);

export const updateSportiv = async (id, nume, prenume, data_nastere, nivel, greutate, inaltime, stare_sanatate, telefon, localitate, sex) => (
    await  instance.post(`sportivi/${id}`, {nume, prenume, data_nastere, nivel, greutate, inaltime, stare_sanatate, telefon, localitate, sex})
);

export const loginUser = async (email, password) => (
    await instance.get(`users/login/${email}/${password}`)
);

export const getDetaliiUser = async (id) => (
    await instance.get(`users/${id}`)
);

