import React from 'react';
import {StyleSheet, View} from "react-native";
import PropTypes from 'prop-types';
import {Text} from "react-native-elements";
import moment from "moment";
import {Rating} from "react-native-elements";
import GrandSlam from '../assets/undraw_grand_slam_0q5r.svg';
import Spacer from "./Spacer";

const AntrenamentItem = props => {
    const {navigation} = props;
    const {date, type, rating} = props.item;
    return (
        <View style={styles.card}>
            <View style={{color: '#ffffff', width: '70%', alignItems: 'flex-start'}}>
                <Text style={styles.text}>Tip antrenament: {type}</Text>
                <Spacer />
                <Text style={styles.text}>Data: {moment(date).format("DD.MM.YYYY")}</Text>
                <Rating
                    type="star"
                    readonly
                    startingValue={rating}
                    style={{paddingVertical: 10}}
                    tintColor='#1ab5ff'
                />
            </View>
            <GrandSlam style={{marginLeft: 5}} width={100} height={100} fill='black'/>
        </View>
    );
};

AntrenamentItem.defaultProps = {
    date: moment(new Date()).format("MM-DD-YYYY")
};

AntrenamentItem.propTypes = {};

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: 150,
        borderWidth: 0,
        borderRadius: 5,
        padding: 20,
        backgroundColor: '#1ab5ff',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
        marginVertical: 10,
        flexDirection: 'row'
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default AntrenamentItem;