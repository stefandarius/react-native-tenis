import React, {useState} from 'react';
import {StatusBar, StyleSheet, View} from "react-native";
import {Header, Input} from "react-native-elements";
import Spacer from "../components/Spacer";
//import RNDateTimePicker from "@react-native-community/datetimepicker";

const DetaliiAntrenorScreen = (props) => {

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="lightblue"/>
            <Header
                leftComponent={{icon: 'menu', color: '#fff'}}
                centerComponent={{text: 'DETALII ANTRENOR', style: {color: '#fff', fontWeight: "bold"}}}
                rightComponent={{icon: 'home', color: '#fff'}}
                backgroundColor="lightblue"
            />
            <Spacer/>
            <View style={styles.fields}>
                <Input placeholder="Nume" containerStyle={styles.inputStyle}/>
                <Spacer/>
                <Input placeholder="Prenume" containerStyle={styles.inputStyle}/>
                <Spacer/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    inputStyle: {
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 5
    },
    fields: {
        paddingHorizontal: 10
    }
});

export default DetaliiAntrenorScreen;