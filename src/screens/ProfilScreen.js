import React from 'react';
import {StyleSheet, View, Dimensions, Image} from "react-native";
import PropTypes from 'prop-types';
import {Text} from "react-native-elements";

const {width: wwidth, height: wheight} = Dimensions.get('window');

const ProfilScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.profileDetails}>
                <Image style={styles.roundImage} source={{uri: "https://ggia.berkeley.edu/assets/general/GGIA-HumanFace.jpg",}}/>
                <Text style={styles.text} h4>Iordache Stefan</Text>
                <Text style={styles.text} h5>Antrenor</Text>
            </View>
        </View>
    );
};

ProfilScreen.defaultProps = {};

ProfilScreen.propTypes = {};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        padding: 50
    },
    profileDetails: {
        backgroundColor: "indigo",
        borderWidth: 0,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
        justifyContent: 'center',
        alignItems: 'center',
        height: wheight/3,
    },
    roundImage: {
        width: 70,
        height: 70,
        borderWidth: 6,
        borderColor: 'white',
        borderRadius: 35,
        marginBottom: 15
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
    },
    imageProfile: {
        width: 70,
        height: 70
    }
});

export default ProfilScreen;