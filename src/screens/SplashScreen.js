/* eslint-disable */
import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import logo from '../assets/logo.png';
import {getAppConfig} from "../network/ApiAxios";
import AppContext from "../context/AppContext";

const SplashScreen = ({navigation}) => {

    const [visible, setVisible] = useState(true);
    const [nume, setNume] = useState('Fana');

    const {setConfig} = useContext(AppContext);

    useEffect(() => {
        const runAsync = async () => {
            const config = await getAppConfig();
            const response = config.data;
            const {data, code, message} = response;
            setConfig(data);
            setTimeout(() => {
                navigation.navigate('Log');
            }, 1000);
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
