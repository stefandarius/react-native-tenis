import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import logo from '../assets/logo.png';
import {Button, Input} from 'react-native-elements';
import Spacer from '../components/Spacer';

const LoginScreen = (props) => {

    const onPressHandler = () => {
        alert('Login');
    };

    return (
        <View style={styles.container}>
            <Image style={styles.imageStyle} source={logo}/>
            <Input placeholder="Email" containerStyle={styles.inputStyle}/>
            <Spacer marginVertical={5}>
                <Input placeholder="Password" secureTextEntry={true} containerStyle={styles.inputStyle}/>
            </Spacer>
            <Button title="Login" containerStyle={styles.buttonStyle} onPress={onPressHandler}/>
        </View>
    );
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
        resizeMode: 'contain',
    },
    buttonStyle: {
        marginTop: 10,
        width: '100%',
    },
    inputStyle: {
        borderWidth: 1,
        borderRadius: 5,
    },
});

export default LoginScreen;
