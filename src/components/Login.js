import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return(
        <>
            <TextInput
                style={styles.input}
                placeholder='Username'
                onChangeText={text => setUsername(text)}/>
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder='Password'
                onChangeText={text => setPassword(text)}/>
             <View style={styles.btn}>
                 <Button title="Login"/>
             </View>
        </>
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        margin: 5,
        width: '60%',
        borderRadius: 10,
        paddingStart: 10
    },
    btn: {
        paddingTop: 25,
    }
});

export default Login;
