import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";
import {withNavigation} from "react-navigation";
import LabelHeader from "../components/LabelHeader";
import {Button, ButtonGroup, Input} from "react-native-elements";
import Spacer from "../components/Spacer";
import HyperLink from "../components/HyperLink";
import {createUser} from "../network/ApiAxios";

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
            <LabelHeader textSize={40} style={{fontWeight: 'bold'}}>REGISTER</LabelHeader>
            <Spacer marginVertical={20} />
            <TextInput style={styles.inputStyle} placeholder={"email@adress.com"} onChange={value => setEmail(value)}/>
            <Spacer />
            <TextInput style={styles.inputStyle} secureTextEntry={true} placeholder={"Password"} onChange={value => setPassword(value)}/>
            <Spacer />
            <TextInput style={styles.inputStyle} secureTextEntry={true} placeholder={"Confirm password"} onChange={value => setConfirm(value)}/>
            {err}
            <Spacer />
            <ButtonGroup
                onPress={(value) => setSelectedIndex(value)}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{height: 50}}
            />
            <Button containerStyle={styles.buttonStyle} title={'REGISTER'} titleStyle={{fontWeight: 'bold'}} onPress={goFurther} loading={loading}/>
            <Spacer marginVertical={10} />
            <HyperLink title={"Am deja un cont"} route={'Log'}/>
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

export default withNavigation(RegisterScreen);