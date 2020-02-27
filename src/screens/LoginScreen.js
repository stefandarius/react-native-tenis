import React, { useState } from 'react';
import { StyleSheet, View, Image, Alert } from 'react-native';

import logo from '../assets/logo.png';
import { Input, Button } from 'react-native-elements';
import SportivItem from '../components/SportivItem';
import LabelHeader from '../components/LabelHeader';



const LoginScreen = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const onPressHandler = () => {
        setLoading(true);
        setTimeout(() => {
            Alert.alert('Ne-am logat');
            setLoading(false);
        }, 5000);
    };
    return (<View style={styles.container}>
        {/* <SportivItem /> */}
        <LabelHeader > catalin </LabelHeader>
        <Image style={styles.imageStyle} source={logo} />
        <Input value={email} placeholder="Email" label="Email" onChangeText={(value) => setEmail(value)} />
        <Input value={password} secureTextEntry={true} placeholder="Parola" label="Parola" onChangeText={(value) => setPassword(value)} />
        <Button onPress={onPressHandler} containerStyle={styles.buttonStyle} title="Login" loading={loading} />
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