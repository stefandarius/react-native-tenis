/* eslint-disable */
import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import logo from '../assets/logo.png';
import {getAppConfig} from "../network/ApiAxios";
import AppContext from "../context/AppContext";
import AsyncStorage from '@react-native-community/async-storage';
import {getDataForKey} from "../utils/Utility";

const SplashScreen = ({navigation}) => {

    const [nume, setNume] = useState('Fana');

    const {setConfig, setUser} = useContext(AppContext);

    useEffect(() => {
        const runAsync = async () => {
            const config = await getAppConfig();
            const response = config.data;
            const {data, code, message} = response;
            console.log("SplashScreen", data);
            setConfig(data);
            const user = await getDataForKey('user');
            console.log('USER', user);
            let screen = 'Login';
            if(user !== null) {
                setUser(user);
                screen = 'Profil';
                if(user.detalii) {
                    screen = 'Main';
                }
            }
            setTimeout(() => {
                navigation.navigate(screen);
            }, 100);
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
