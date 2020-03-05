import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';

const ForgotPasswordScreen = () =>{

    return (<View style={styles.container}>
            <Input placeholder='Email' label='Email'/>
            <Button title='Recuperare' containerStyle={styles.buttonStyle} />
    </View>)
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop:30
    },  
    buttonStyle:{
        marginTop:10,
        width:'100%',
    }
});

export default ForgotPasswordScreen;