import React, {useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {withNavigation} from "react-navigation";
import LabelHeader from "../components/LabelHeader";
import {Button, ButtonGroup, Input} from "react-native-elements";
import Spacer from "../components/Spacer";
import HyperLink from "../components/HyperLink";
import {createUser, getAppConfig} from "../network/ApiAxios";

const RegisterScreen = ({navigation}) => {

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[confirm, setConfirm] = useState('');
    const[error, setError] = useState(false);
    const[errorMessage, setErrorMessage] = useState("Parola incorecta");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    const validate = () => {
        if(password === confirm){
            return true;
        } else {
            setError(true);
            return false;
        }
    };

    const goFurther = async () => {
        if(validate) {
            setLoading(true);
            const userResponse = await createUser(email, password, selectedIndex);
            const response = userResponse.data;
            const {data, code, message, success} = response;
            if(success) {
                console.log("RegisterScreen", data);
                //todo: save user to async storage
                navigation.pop();
            } else {
                setError(true);
                setErrorMessage(message);
            }
            setLoading(false);
        }
    };

    let err = error ? <Text style={{color: 'red'}}>{errorMessage}</Text> : null;

    const buttons = ['Antrenor', 'Sportiv'];

    return (
        <View style={styles.container}>
            <LabelHeader textSize={40}>REGISTER</LabelHeader>
            <Input placeholder={"Email"} label={"Email"} onChangeText={value => setEmail(value)}/>
            <Input secureTextEntry={true} placeholder={"Password"} label={"Password"} onChangeText={value => setPassword(value)}/>
            <Input secureTextEntry={true} placeholder={"Confirm Password"} label={"Confirm Password"} onChangeText={value => setConfirm(value)}/>
            <Spacer />
            {err}
            <ButtonGroup
                onPress={(value) => setSelectedIndex(value)}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{height: 50}}
            />
            <Button containerStyle={styles.buttonStyle} title={'REGISTER'} onPress={goFurther} loading={loading}/>
            <Spacer />
            <HyperLink title={"Am deja cont"} route={'Log'} textStyle={{color: 'blue'}}/>
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