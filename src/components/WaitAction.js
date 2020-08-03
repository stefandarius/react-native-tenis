import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import globals from "../utils/globals";
import PropTypes from "prop-types";

const WaitAction = ({ progressColor, title, enabled }) => {
    const [text, setText] = useState(title);
    const [color, setColor] = useState(progressColor);
    const [visible, setVisible] = useState(enabled);

    useEffect(() => {
        setText(title);
        setColor(color);
        setVisible(enabled);
    }, [title, progressColor, enabled]);
    return (visible ?
        <View style={styles.loading}>
            <ActivityIndicator color={color} size={'large'} />
            <Text style={styles.spinnerTextStyle}>{text}</Text>
        </View> : null);
};

WaitAction.defaultProps = {
    title: 'Please wait...',
    progressColor: globals.PRIMARY_COLOR,
    enabled: false
};

WaitAction.propTypes = {
    title: PropTypes.string,
    progressColor: PropTypes.string,
    enabled: PropTypes.bool
};

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    loading: {
        //flex:1,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        backgroundColor: '#cccccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default WaitAction; 