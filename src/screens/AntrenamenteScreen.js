import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import AntrenamentItem from "../components/AntrenamentItem";
import TakeABreak from '../assets/undraw_a_moment_to_relax_bbpa.svg';
import moment from "moment";
import Spacer from "../components/Spacer";
import LabelHeader from "../components/LabelHeader";

const AntrenamenteScreen = () => {

    const antrenamente = [
        {id: 1, tipAntrenament: 'Forehand', date: moment(new Date()).format("DD.MM.YYYY"), rating: 2},
        {id: 2, tipAntrenament: 'Backhand', date: moment(new Date()).format("DD.MM.YYYY"), rating: 3.5},
        {id: 3, tipAntrenament: 'Serve', date: moment(new Date()).format("DD.MM.YYYY"), rating: 5},
    ];

    const takeABreak = (
        <View style={styles.emptyArray}>
            <TakeABreak width="200" height="200"/>
            <LabelHeader style={{color: '#636363', fontSize: 16}} h3>You don't have anything scheduled</LabelHeader>
            <Spacer/>
            <LabelHeader style={{color: '#636363', fontSize: 18}} h3>Take a break!</LabelHeader>
        </View>
    );

    const renderAntrenamente = antrenamente.length <= 0 ?
        takeABreak :
        antrenamente.map(antrenament => (
            <AntrenamentItem key={antrenament.id} date={antrenament.date} type={antrenament.tipAntrenament}
                             rating={antrenament.rating}/>
        ));

    return (
        <View style={styles.container}>
            {renderAntrenamente}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 20
    },
    emptyArray: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
});

export default AntrenamenteScreen;