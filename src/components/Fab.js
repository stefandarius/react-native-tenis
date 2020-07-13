import * as React from 'react';
import {StyleSheet} from 'react-native';
import {FAB} from 'react-native-paper';

const MyComponent = ({clicked}) => {
    return (
        <FAB
            style={styles.fab}
            small={false}
            icon="plus"
            onPress={clicked}
        />
    )
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});

export default MyComponent;