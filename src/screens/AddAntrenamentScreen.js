import React, {useContext, useEffect, useState} from 'react';
import {Alert, Picker, StyleSheet, TouchableOpacity, View} from "react-native";
import PropTypes from 'prop-types';
import LabelHeader from "../components/LabelHeader";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AppContext from "../context/AppContext";
import {Button, Input, Slider, Text} from "react-native-elements";
import moment from "moment";
import {Rating} from "react-native-ratings";
import Spacer from "../components/Spacer";
import {addAntrenament, getSportivi} from "../network/ApiAxios";

const AddAntrenamentScreen = ({navigation}) => {
    const {action, title} = navigation.getParam('data', null);
    const {data} = useContext(AppContext);

    const [dataAntrenament, setDataAntrenament] = useState(new Date());
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [tipAntrenament, setTipAntrenament] = useState(0);
    const [gradDificultate, setGradDificultate] = useState(0);
    const [rating, setRating] = useState(0);
    const [sportiv, setSportiv] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sportivi, setSportivi] = useState([]);

    const dificultate = ["usor", "mediu", "intens", "profesionist"];

    useEffect(() => {
        const runAsync = async () => {
            const response = await getSportivi();
            const {data} = response.data;
            setSportivi(data);
        };
        runAsync();
    }, []);

    const renderTipuriAntrenamente = () => {
        return data.tipAntrenament.map((item) => {
            return <Picker.Item label={item.denumirea} value={item.id} key={item.id}/>;
        });
    };

    const renderSportivi = () => {
        return sportivi.map((item) => {
            return <Picker.Item label={item.profil.nume + " " + item.profil.prenume} value={item.profil.id} key={item.profil.id}/>;
        });
    };

    const handleConfirm = (date) => {
        setIsDatePickerVisible(false);
        setDataAntrenament(date);
    };

    const handleSave = async () => {
        setLoading(true);
        const response = await addAntrenament(sportiv, tipAntrenament, gradDificultate, moment(dataAntrenament).format("DD.MM.YYYY HH:mm:ss"));
        const {data, success, message} = response.data;
        if (success) {
            setLoading(false);
            navigation.pop();
            return;
        }
        setLoading(false);
        Alert.alert("Eroare la salvare", message);
    };

    return (
        <View style={[styles.container]}>
            <DateTimePickerModal
                date={dataAntrenament}
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={() => setIsDatePickerVisible(false)}
                minimumDate={new Date()}
            />
            <Spacer marginVertical={20}/>
            <View style={styles.dropDown}>
                <Picker
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    selectedValue={sportiv}
                    onValueChange={(itemValue) => {
                        setSportiv(itemValue);
                        console.log(itemValue);
                    }}
                >
                    <Picker.Item label="--Selectati sportivul--" value={0} key={0}/>
                    {renderSportivi()}
                </Picker>
            </View>
            <View style={styles.dropDown}>
                <Picker
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    selectedValue={tipAntrenament}
                    onValueChange={(itemValue) => {
                        setTipAntrenament(itemValue);
                        console.log(itemValue);
                    }}
                >
                    <Picker.Item label="--Selectati tipul antrenamentului--" value={0} key={0}/>
                    {renderTipuriAntrenamente()}
                </Picker>
            </View>
            <Text style={{textAlign: 'center', fontSize: 22}}>Grad dificultate: {dificultate[gradDificultate]}</Text>
            <View style={{paddingHorizontal: 25}}>
                <Slider
                    onValueChange={setGradDificultate}
                    maximumValue={3} step={1}
                    minimumTrackTintColor='red'
                    maximumTrackTintColor='green'
                    thumbTintColor='blue'
                />
            </View>
            <TouchableOpacity style={{width: '100%'}} onPress={() => setIsDatePickerVisible(true)}>
                <View pointerEvents={'box-only'}>
                    <Input value={moment(dataAntrenament).format("DD.MM.YYYY HH:mm")} disabled
                           placeholder={"Data antrenament"}/>
                </View>
            </TouchableOpacity>
            <Spacer/>
            {!action && <Rating fractions={0} onFinishRating={setRating}/>}
            <View style={styles.bottom}>
                <Button loading={loading} title={"Save"} containerStyle={styles.buttonStyle}
                        buttonStyle={{paddingRight: 0}} onPress={handleSave}/>
            </View>
        </View>
    );
};

AddAntrenamentScreen.defaultProps = {};

AddAntrenamentScreen.propTypes = {};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        paddingHorizontal: 10
    },
    picker: {
        height: Platform.OS === 'android' ? 50 : 110,
    },
    pickerItem: {
        height: Platform.OS === 'android' ? 50 : 110,
    },
    dropDown: {
        justifyContent: 'center',
        height: Platform.OS === 'android' ? 50 : 110,
        borderRadius: 5,
        marginBottom: 5,
        width: '100%'
    },
    buttonStyle: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
    },
    bottom: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        padding: 10,
        width: '100%',
    }
});

export default AddAntrenamentScreen;