import React, {useContext} from 'react';
import {StyleSheet, View} from "react-native";
import PropTypes from 'prop-types';
import LabelHeader from "../components/LabelHeader";
import Spacer from "../components/Spacer";
import {Text} from "react-native-elements";
import AppContext from "../context/AppContext";

const UserDetailsScreen = () => {

    const {user} = useContext(AppContext);
    const {detalii} = user;
    const {profil} = detalii;

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <LabelHeader textSize={30}>Personal details</LabelHeader>
                <Spacer />
                <View style={{borderBottomWidth: 2}}/>
                <Text style={styles.text}>Name: {profil.prenume}</Text>
                <Text style={styles.text}>Surname: {profil.nume}</Text>
                <Text style={styles.text}>Date of birth: {profil.data_nastere}</Text>
                <Text style={styles.text}>Gender: {profil.gen ? "Male" : "Female"}</Text>
                <Text style={styles.text}>Phone number: {profil.telefon}</Text>
                <Text style={styles.text}>City: {profil.localitateText}</Text>
            </View>
            <View style={styles.card}>
                <LabelHeader textSize={30}>Training details</LabelHeader>
                <Spacer />
                <View style={{borderBottomWidth: 2}}/>
                <Text style={styles.text}>Level: {detalii.nivelText}</Text>
                <Text style={styles.text}>Health state: {detalii.stareSanatateText}</Text>
                <Text style={styles.text}>Role: {user.rol}</Text>
                <Text style={styles.text}>Height: {detalii.inaltime} cm</Text>
                <Text style={styles.text}>Weight: {detalii.greutate} kg</Text>
            </View>
        </View>
    );
};

UserDetailsScreen.defaultProps = {};

UserDetailsScreen.propTypes = {};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fcfdff",
        flex: 1,
        padding: 30,
    },
    card: {
        padding: 10,
        backgroundColor: "white",
        borderWidth: 0,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
        marginTop: 30,
        marginBottom: 20
    },
    text: {
        marginVertical: 5,
        fontSize: 20
    }
});

export default UserDetailsScreen;