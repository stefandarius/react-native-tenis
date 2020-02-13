import React from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types'

const Spacer = ({marginVertical, children, style}) => {

    const  marginStyle = () => {
        return {marginVertical: marginVertical ? marginVertical : 5};
    };

    return(
        <View style={[marginStyle(), styles.container, style]}>{children}</View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    }
});

Spacer.propTypes = {
    marginVertical: PropTypes.number
};

export default Spacer;
