import AsyncStorage from "@react-native-community/async-storage";

export const storeDataForKey = async (data, key) => {
    try {
        await AsyncStorage.setItem(`@${key}`, JSON.stringify(data))
    } catch (e) {
        console.error('AsyncStorage storeDataForKey', e);
    }
};

export const getDataForKey = async (key) => {
    try {
        return JSON.parse(await AsyncStorage.getItem(`@${key}`));
    } catch (e) {
        console.error('AsyncStorage getDataForKey', e);
        return null;
    }
};

export const removeDataForKey = async (key) => {
    try {
        await AsyncStorage.removeItem(`@${key}`);
    }  catch (e) {
        console.error("AsyncStorage removeItemForKey", e);
    }
};