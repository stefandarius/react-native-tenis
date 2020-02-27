/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import logo from '../assets/logo.png';

const SplashScreen = ({navigation}) => {

    const [visible, setVisible] = useState(true);
    const [nume, setNume] = useState('Fana');

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Log');
        }, 4000);
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
