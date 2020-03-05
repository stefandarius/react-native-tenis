import React, {useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {withNavigation} from "react-navigation";
import LabelHeader from "../components/LabelHeader";
import {Button, Input} from "react-native-elements";
import Spacer from "../components/Spacer";

const RegisterScreen = ({navigation}) => {

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[confirm, setConfirm] = useState('');
    const[error, setError] = useState(false);

    const validate = () => {
        if(password === confirm){
            navigation.navigate('Log');
            return true;
        } else {
            setError(true);
            return false;
        }
    };

    let err = error ? <Text style={{color: 'red'}}>Parola incorecta</Text> : null

    return (
        <View style={styles.container}>
            <LabelHeader textSize={40}>REGISTER</LabelHeader>
            <Input placeholder={"Email"} label={"Email"} onChangeText={value => setEmail(value)}/>
            <Input secureTextEntry={true} placeholder={"Password"} label={"Password"} onChangeText={value => setPassword(value)}/>
            <Input secureTextEntry={true} placeholder={"Confirm Password"} label={"Confirm Password"} onChangeText={value => setConfirm(value)}/>
            <Spacer />
            {err}
            <Button containerStyle={styles.buttonStyle} title={'REGISTER'} onPress={validate}/>
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
    buttonStyle: {
        marginTop: 10,
        width: '100%',
    }
});

export default withNavigation(RegisterScreen);