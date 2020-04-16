import React from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native";
import PropTypes from 'prop-types';
import FontAwesome from "react-native-vector-icons/FontAwesome";

const EditButton = ({navigation}) => {

    const editHandler = () => {
          navigation.navigate('ProfilForm');
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