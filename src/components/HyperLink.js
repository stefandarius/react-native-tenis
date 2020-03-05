import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {withNavigation} from "react-navigation";
import PropTypes from "prop-types";

const HyperLink = ({title, route, container, textStyle, data, navigation}) => {
    return (
        <TouchableOpacity style={[styles.container, container]} onPress={() => {
            navigation.navigate(route, data);
        }}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

HyperLink.defaultProps = {
    title: 'Title',
    route: '',
    data: {},
    textStyle: {},
    container: {}
};

HyperLink.propTypes = {
    title: PropTypes.string,
    route: PropTypes.string,
    data: PropTypes.object,
    textStyle: PropTypes.object,
    container: PropTypes.object
}

const styles = StyleSheet.create({
    container: {

    },
    text: {
        fontWeight: 'bold',
        color: 'cyan'
    }
});

export default withNavigation(HyperLink);