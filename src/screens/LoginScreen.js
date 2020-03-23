import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Image, Alert, TouchableOpacity, Text, StatusBar, TextInput, Platform} from 'react-native';
import logo from '../assets/logo.png';
import {Button, SocialIcon} from 'react-native-elements';
import LabelHeader from "../components/LabelHeader";
import HyperLink from "../components/HyperLink";
import AppContext from "../context/AppContext";
import Spacer from "../components/Spacer";

const LoginScreen = () => {

    const [userName, setUsername] = useState("");
    const [pressed, setPressed] = useState(false);

    const {data} = useContext(AppContext);

    useEffect(() => {
        console.log("LoginScreen", data);
    }, []);

    const onPressHandler = () => {
        setPressed(true);
        setTimeout(() => {
            Alert.alert("Am intrat!");
            setPressed(false);
        }, 2000)
    };

    return (
        <View style={styles.container}>
            <Image style={styles.imageStyle} source={logo}/>
            <LabelHeader
                textSize={48}
                style={{paddingVertical: 20, fontWeight: 'bold'}}
            >
                LOGIN
            </LabelHeader>
            <TextInput style={styles.inputStyle} placeholder="Email" onChange={value => setUsername(value)}/>
            <Spacer/>
            <TextInput style={styles.inputStyle} secureTextEntry={true} placeholder="Parola"/>
            <Button onPress={onPressHandler} containerStyle={styles.buttonStyle} titleStyle={{fontWeight: "bold"}} title="Login" loading={pressed}/>
            <View style={styles.rowStyle}>
                {Platform.OS === "ios" ? <SocialIcon type={"apple"} light/>: null}
                <SocialIcon type={"google"} light />
                <SocialIcon type={"facebook"} light />
                <SocialIcon type={"instagram"} light />
                <SocialIcon type={"twitter"} light />
            </View>
            <View style={styles.rowStyle}>
                <HyperLink title={"Register"} route={'Reg'}/>
                <View
                    style={{
                        borderLeftColor: 'black',
                        borderLeftWidth: 1,
                    }}
                />
                <HyperLink title={"Forgot password"} route={'Profil'}/>
            </View>
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
    rowStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '60%',
        paddingVertical: 15,
    },
    imageStyle: {
        resizeMode: "contain",
    },
    buttonStyle: {
        marginTop: 10,
        width: '95%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
    },
    inputStyle: {
        height: 43,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fafafa',
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,
        width: '95%'
    }
});

export default LoginScreen;