import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from "react-native";
import PropTypes from 'prop-types';
import AsyncStorage from "@react-native-community/async-storage";

const MainScreen = ({navigation}) => {

    useEffect(() => {
        const getProfil = async () => {
            const profil = await getData();
            if(!profil) {
                navigation.navigate('Profil');
            }
        };
        getProfil();
    }, []);

    const getData = async () => {
        try {
            return await AsyncStorage.getItem('@profil');
        } catch (e) {
            return null;
        }
    };

    return (
        <View>
            <Text>Main screen</Text>
        </View>
    );
};

MainScreen.defaultProps = {};

MainScreen.propTypes = {};

const styles = StyleSheet.create({});

export default MainScreen;