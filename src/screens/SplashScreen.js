/* eslint-disable */
import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import logo from '../assets/logo.png';
import {getAppConfig} from "../network/ApiAxios";
import AppContext from "../context/AppContext";
import AsyncStorage from '@react-native-community/async-storage';

const SplashScreen = ({navigation}) => {

    const [visible, setVisible] = useState(true);
    const [nume, setNume] = useState('Fana');

    const {setConfig, setUser} = useContext(AppContext);

    const getData = async () => {
        try {
            return await AsyncStorage.getItem('@user');
        } catch (e) {
            return null;
        }
    };

    useEffect(() => {
        const runAsync = async () => {
            const config = await getAppConfig();
            const response = config.data;
            const {data, code, message} = response;
            console.log("SplashScreen", data);
            setConfig(data);
            const userString = await getData();
            let screen = 'Login';
            if(userString) {
                const user = JSON.parse(userString);
                setUser(user);
                screen = 'Main';
            }
            setTimeout(() => {
                navigation.navigate(screen);
            }, 10);
        };
        runAsync();
    }, []);

    return (
        <View style={styles.container}>
            <Image source={logo}/>
            <ActivityIndicator size={'large'}/>
            <Text style={styles.textStyle}>{nume}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 50,
    },
});

export default SplashScreen;
