import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const EmptyList = (props) => {
    const { title, icon } = props;
    return (<View style={styles.container}>
        {icon}
        <Text style={styles.textStyle}>{title}</Text>
    </View>)
};

EmptyList.defaultProps = {
    title: 'Nu exista date',
    icon: <Icon name={'th-list'} size={60} color={'blue'} />
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        marginTop: 10,
    },
});

export default EmptyList;