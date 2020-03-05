import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import PropTypes from "prop-types";

const LabelHeader = ({textSize, color, children, style}) => {

    const colorStyle = () => {
        return {
            color
        }
    };

    const fontSizeStyle = () => {
        return {
            fontSize: textSize
        }
    };

    return(
        <View style={styles.container}>
            <Text style={[colorStyle(), fontSizeStyle(), style]}>
                {children}
            </Text>
        </View>
    );
};

LabelHeader.defaultProps = {
    textSize: 12,
    color: 'black',
};

LabelHeader.propTypes = {
    color: PropTypes.string,
    textSize: PropTypes.number,
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%'
    }
});

export default LabelHeader;