import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Logo from '../assets/logo.png';

const LoginScreen = props => {
    return(
        <View style={styles.container}>
            <Image style={styles.imageStyle} source={Logo}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        flex:1
    },
    imageStyle: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    }
});

export default LoginScreen;
