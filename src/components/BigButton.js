import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import PropTypes from 'prop-types';
import Spacer from "./Spacer";

const BigButton = ({src, text, style, clicked, icon}) => {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={clicked}>
            {icon ? icon :
                <Image
                    style={{width: 50, height: 50, justifyContent: 'center', alignItems: 'center',}}
                    source={src}/>}
            <Spacer/>
            <Text style={{color: "black", fontSize: 16, fontWeight: "bold", textAlign: 'center'}}>{text}</Text>
        </TouchableOpacity>
    );
};

BigButton.defaultProps = {
    src: {},
    style: {}
};

BigButton.propTypes = {
    src: PropTypes.object,
    text: PropTypes.string,
    style: PropTypes.object,
    clicked: PropTypes.func,
    icon: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        width: 200,
        borderWidth: 0,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 0,
        marginVertical: 20,
        justifyContent: "center",
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginTop: 10,
    }
});

export default BigButton;