import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AntrenamentItem from "../components/AntrenamentItem";
import TakeABreak from '../assets/undraw_a_moment_to_relax_bbpa.svg';
import moment from "moment";
import Spacer from "../components/Spacer";
import LabelHeader from "../components/LabelHeader";
import CalendarStrip from "react-native-calendar-strip/src/CalendarStrip";
import Fab from "../components/Fab";
import { getAntrenamente } from '../network/ApiAxios';
import WaitAction from '../components/WaitAction';
import { SwipeListView } from 'react-native-swipe-list-view';
import Ionicons from 'react-native-vector-icons/FontAwesome';

const AntrenamenteListScreen = ({ navigation }) => {

    const [date, setDate] = useState(new Date());
    const [records, setRecords] = useState([]);
    let [markedDates, setMarkedDates] = useState([]);
    const [antrenamente, setAntrenamente] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const runAsync = async () => {
            const response = await getAntrenamente();
            const { data, message, code } = response.data;
            setAntrenamente(data.istoricantrenaments);
            setLoading(false);

        };
        runAsync();
    }, []);

    useEffect(() => {
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
        console.log('[DEBUG] AntrenamenteListScreen', 'useEffect', 'setMarkedDates');
    }, [antrenamente]);
    useEffect(() => {
        console.log('[DEBUG] AntrenamenteListScreen', 'useEffect', 'setRecords');
        setRecords(antrenamente.filter(antrenament =>
            moment(antrenament.data_antrenament).format('MM.DD.YYYY') === moment(date).format("MM.DD.YYYY")))
    }, [antrenamente, date]);


    const takeABreak = (
        <View style={styles.emptyArray}>
            <TakeABreak width="200" height="200" />
            <LabelHeader style={{ color: '#636363', fontSize: 16 }} h3>You don't have anything scheduled</LabelHeader>
            <Spacer />
            <LabelHeader style={{ color: '#636363', fontSize: 18 }} h3>Take a break!</LabelHeader>
        </View>
    );

    return (
        <View style={styles.container}>
            <CalendarStrip
                calendarAnimation={{ type: 'sequence', duration: 30 }}
                daySelectionAnimation={{ type: 'background', duration: 300, highlightColor: '#366cd1' }}
                style={{ height: 120, paddingTop: 20, paddingBottom: 10 }}
                calendarHeaderStyle={{ color: 'white' }}
                calendarColor={'#3060d1'}
                dateNumberStyle={{ color: 'white' }}
                dateNameStyle={{ color: 'white' }}
                iconContainer={{ flex: 0.1 }}
                onDateSelected={setDate}
                markedDates={markedDates}
            />
            <SwipeListView
                renderHiddenItem={(data, rowMap) => (
                    <View style={styles.rowBack}>
                        <TouchableOpacity style={{ width: 75, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', height: '100%' }}>
                            <Ionicons name={'trash-o'} color='white' size={25} />
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Sterge</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: 75, backgroundColor: 'blue', height: '100%', }}>
                            <Ionicons name={'edit'} color='white' size={25} />
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Editare</Text>
                        </TouchableOpacity>

                    </View>
                )}
                disableRightSwipe
                //leftOpenValue={150}
                rightOpenValue={-150}
                data={records}
                renderItem={info => <AntrenamentItem item={info.item} />}
                ListEmptyComponent={takeABreak}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
            />
            <Fab clicked={() => {
                navigation.navigate('Adaugare', { data: { action: true, title: "Adauga Antrenament" } })
            }} />
            <WaitAction enabled={loading} />
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
    rowBack: {
        alignItems: 'center',
        // backgroundColor: '#DDD',
        flex: 1,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        //paddingLeft: 15,
    },
});

export default AntrenamenteListScreen;