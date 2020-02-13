import React from 'react';
import { StyleSheet, View, Image, Alert } from 'react-native';

import logo from '../assets/logo.png';
import { Input, Button } from 'react-native-elements';
import SportivItem from '../components/SportivItem';

const LoginScreen = (props) => {
    const onPressHandler = () => {
        Alert.alert('login')
    };
    return (<View style={styles.container}>
        <SportivItem />
        <Image style={styles.imageStyle} source={logo} />
        <Input placeholder="Email" label="Email" />
        <Input secureTextEntry={true} placeholder="Parola" label="Parola" />
        <Button onPress={onPressHandler} containerStyle={styles.buttonStyle} title="Login" />
    </View>)
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    imageStyle: {
        // width:100,
        // height:100,
        resizeMode: "contain",
    },
    buttonStyle: {
        marginTop: 10,
        width: '100%',
    }
});

export default LoginScreen;