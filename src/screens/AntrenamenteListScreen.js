import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from "react-native";
import AntrenamentItem from "../components/AntrenamentItem";
import TakeABreak from '../assets/undraw_a_moment_to_relax_bbpa.svg';
import moment from "moment";
import Spacer from "../components/Spacer";
import LabelHeader from "../components/LabelHeader";
import CalendarStrip from "react-native-calendar-strip/src/CalendarStrip";
import Fab from "../components/Fab";
import {getAntrenamente} from "../network/ApiAxios";
import WaitAction from "../components/WaitAction";
import {SwipeListView} from "react-native-swipe-list-view";

const AntrenamenteListScreen = ({navigation}) => {

    const [date, setDate] = useState(new Date());
    const [records, setRecords] = useState([]);
    const [markedDates, setMarkedDates] = useState([]);
    const [antrenamente, setAntrenamente] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const runAsync = async () => {
            const response = await getAntrenamente();
            const {data} = response.data;
            console.log(data.istoricantrenaments);
            setAntrenamente(data.istoricantrenaments);
            setLoading(false);
        };
        runAsync();
        setMarkedDates(antrenamente.map(antrenament => ({
            date: antrenament.data_antrenament,
            dots: [
                {
                    key: antrenament.id,
                    color: 'pink',
                    selectedDotColor: 'green',
                }
            ]
        })));
    }, []);

    useEffect(() => {
        setRecords(antrenamente.filter(antrenament =>
            moment(antrenament.data_antrenament).format("MM.DD.YYYY") === moment(date).format("MM.DD.YYYY")))
    }, [antrenamente, date]);

    // const antrenamente = [
    //     {id: 1, tipAntrenament: 'Forehand', date: new Date(), rating: 2},
    //     {id: 2, tipAntrenament: 'Backhand', date: new Date(), rating: 3.5},
    //     {id: 3, tipAntrenament: 'Serve', date: new Date(), rating: 5},
    //     {id: 4, tipAntrenament: 'Forehand', date: moment("2020-05-06"), rating: 2},
    //     {id: 5, tipAntrenament: 'Backhand', date: moment("2020-05-08"), rating: 3.5},
    //     {id: 6, tipAntrenament: 'Serve', date: moment("2020-05-09"), rating: 5},
    // ];

    const takeABreak = (
        <View style={styles.emptyArray}>
            <TakeABreak width="200" height="200"/>
            <LabelHeader style={{color: '#636363', fontSize: 16}} h3>You don't have anything scheduled</LabelHeader>
            <Spacer/>
            <LabelHeader style={{color: '#636363', fontSize: 18}} h3>Take a break!</LabelHeader>
        </View>
    );

    return (
        loading ? <WaitAction /> :
        <View style={styles.container}>
            <CalendarStrip
                calendarAnimation={{type: 'sequence', duration: 30}}
                daySelectionAnimation={{type: 'background', duration: 300, highlightColor: '#366cd1'}}
                style={{height:120, paddingTop: 20, paddingBottom: 10}}
                calendarHeaderStyle={{color: 'white'}}
                calendarColor={'#3060d1'}
                dateNumberStyle={{color: 'white'}}
                dateNameStyle={{color: 'white'}}
                iconContainer={{flex: 0.1}}
                onDateSelected={setDate}
                markedDates={markedDates}
            />
            <SwipeListView
                data={records}
                renderItem={info => <AntrenamentItem item={info.item} />}
                ListEmptyComponent={takeABreak}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{flexGrow: 1, paddingHorizontal: 20}}
                renderHiddenItem={ (data, rowMap) => (
                    <View style={styles.rowBack}>
                        <Text>Left</Text>
                        <Text>Right</Text>
                    </View>
                )}
                leftOpenValue={75}
                rightOpenValue={-75}
            />
            <Fab clicked={() => {
                navigation.navigate('Adaugare', {data: {action: true, title: "Adauga Antrenament"}})
            }}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    emptyArray: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'red',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        margin: 10,
        borderRadius: 5,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
});

export default AntrenamenteListScreen;