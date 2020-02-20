import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Card, Text } from 'react-native-elements';
import logo from '../assets/logo.png';

const SportivItem = (props) => {
    const { nume, email, gen, varsta, stareSanatate } = props.item;
    return (<Card containerStyle={styles.cardStyle}>
        <View style={styles.container}>
            <Image source={logo} style={styles.imageStyle} />
            <View style={styles.sportivDetails}>
                <Text style={styles.numeStyle}>{nume}</Text>
                <Text h5>{email}</Text>
                <View style={styles.rowVarstaSexStare}>
                    <Text h5>{`${varsta} ani`}</Text>
                    <Text h5>{gen ? 'Baiat' : 'Fata'}</Text>
                    <Text h5>{stareSanatate}</Text>
                </View>
            </View>
        </View>
    </Card>);
};

SportivItem.defaultProps={
    item:{id:1,email:'email@email.com',nume:'NUME SPORTIV',gen:true,varsta:100,stareSanatate:'Sanatos'}
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    imageStyle: {
        borderWidth: 1,
        borderColor: '#dedede',
        width: 100,
        height: 100,
        resizeMode: "contain",
    },
    cardStyle: {
        borderRadius: 5,
    },
    sportivDetails: {
        paddingHorizontal: 5,
        flex: 1,
    },
    rowVarstaSexStare: {
        flexDirection: 'row',
        // borderWidth: 1,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    numeStyle:{
        fontSize:15,
        fontWeight:'bold',
    },
});

export default SportivItem;