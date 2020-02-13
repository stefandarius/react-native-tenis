import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import logo from '../assets/logo.png';

const LoginScreen =(props)=>{
    return (<View  style={styles.container}>
        <Image style={styles.imageStyle} source={logo} />
    </View>)
};

const styles=StyleSheet.create({
    container:{
        backgroundColor:'red',
        flex:1,
    },
    imageStyle:{
        width:100,
        height:100,
        resizeMode: "contain",
    },
});

export default LoginScreen;