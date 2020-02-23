import React, {useState} from 'react';
import {StyleSheet, View, Image, Alert, ActivityIndicator} from 'react-native';
import logo from '../assets/logo.png';
import { Input, Button } from 'react-native-elements';
import SportivItem from '../components/SportivItem';
import LabelHeader from "../components/LabelHeader";

const LoginScreen = () => {

    const [userName, setUsername] = useState("");
    const [pressed, setPressed] = useState(false);

    const onPressHandler = () => {
        setPressed(true);
        setTimeout(() => {
            Alert.alert("Am intrat!");
            setPressed(false);
        }, 2000)
    };



    return (<View style={styles.container}>
        <Image style={styles.imageStyle} source={logo} />
        <LabelHeader textSize={48} style={{paddingVertical: 20, fontWeight: 'bold'}}>LOGIN</LabelHeader>
        <Input placeholder="Email" label="Email" onChangeText={value => setUsername(value)}/>
        <Input secureTextEntry={true} placeholder="Parola" label="Parola" />
        <Button onPress={onPressHandler} containerStyle={styles.buttonStyle} title="Login" loading={pressed}/>
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