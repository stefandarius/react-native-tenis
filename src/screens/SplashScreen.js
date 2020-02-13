/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import logo from '../assets/logo.png';
import Login from '../components/Login';

const SplashScreen = () => {

    const [visible, setVisible] = useState(true);
    const [nume, setNume] = useState('Fana');

    useEffect(() => {
        setTimeout(() => {
            setVisible(false);
            setNume('Cata');
        }, 4000);
    }, []);

    return (
        <View style={styles.container}>
            <Image source={logo}/>
            {visible ? <ActivityIndicator size={'large'}/> : <Login/>}
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
