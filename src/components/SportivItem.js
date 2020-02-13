import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Card, Text } from 'react-native-elements';
import logo from '../assets/logo.png';

const SportivItem = ({ nume, email, gen }) => {
    return (<Card containerStyle={styles.cardStyle}>
        <View style={styles.container}>
            <Image source={logo} style={styles.imageStyle} />
            <View style={styles.sportivDetails}>
                <Text h4>RADU MARIAN</Text>
                <Text h5>radumrn@gmail.com</Text>
                <View style={styles.rowVarstaSexStare}>
                    <Text h5>36 ani</Text>
                    <Text h5>Baiat</Text>
                    <Text h5>Sanatos</Text>
                </View>
            </View>
        </View>
    </Card>);
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    imageStyle: {
        borderWidth: 1,
        borderColor: 'red',
        width: 100,
        height: 100,
        resizeMode: "contain",
    },
    cardStyle: {
        width: '100%',
        borderRadius: 5,
    },
    sportivDetails: {
        paddingHorizontal: 5,
        flex:1,
    },
    rowVarstaSexStare: {
        flexDirection: 'row',
       // borderWidth: 1,
        flex:1,
        justifyContent: 'space-between',
        alignItems:'center',
    }
});

export default SportivItem;