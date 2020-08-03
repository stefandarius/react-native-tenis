import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AppContext from "../context/AppContext";

const EditButton = ({navigation}) => {

    const {user} = useContext(AppContext);

    const editHandler = () => {
        const screen = user.rol === 'sportiv' ? "ProfilForm" : "ProfilAntrenor"
        navigation.navigate(screen);
    };

    return (
        <TouchableOpacity onPress={editHandler}>
            <FontAwesome style={{marginRight: 10}} name={"edit"} color="white" size={30}/>
        </TouchableOpacity>
    );
};

EditButton.defaultProps = {};

EditButton.propTypes = {};

const styles = StyleSheet.create({});

export default EditButton;