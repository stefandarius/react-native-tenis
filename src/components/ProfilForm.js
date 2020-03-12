import React, {useContext, useEffect, useState} from 'react';
import {Picker, StyleSheet, View} from "react-native";
import {ButtonGroup, Input} from "react-native-elements";
import Spacer from "./Spacer";
import DatePicker from "react-native-datepicker";
import AppContext from "../context/AppContext";

const ProfilForm = () => {

    const [gen, setGen] = useState(0);
    const [dataNastere, setDataNastere] = useState(null);
    const [judet, setJudet] = useState(0);
    const [localitate, setLocalitate] = useState(0);
    const [localitati, setLocalitati] = useState([{id:1, nume: "Calarasi", judet: 1}, {id:2, nume: "Modelu", judet: 1},
        {id:3, nume: "Bucale", judet: 2}, {id:4, nume: "Constanta", judet: 2}]);

    const {data} = useContext(AppContext);

    useEffect(() => {

    }, [data]);

    const renderJudete = () => {
          return data.judete.map((item) => {
              return <Picker.Item label={item.nume} value={item.id} key={item.id}/>;
          });
    };

    const renderLocalitati = () => {
        return localitati.filter((item) => item.judet === judet)
            .map((item) => {
            return <Picker.Item label={item.nume} value={item.id} key={item.id}/>;
        });
    };

    return (
        <View style={styles.container}>
            <Input label={"Nume"} />
            <Input label={"Prenume"} />
            <Input label={"Telefon"} keyboardType={"numeric"} />
            <Spacer />
            <View style={styles.dropDown}>
                <Picker
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    selectedValue={judet}
                    onValueChange={(itemValue) => {
                        setJudet(itemValue);
                        console.log(itemValue);
                    }}
                >
                    <Picker.Item label="--Selectati judet--" value={0} key={0} />
                    {renderJudete()}
                </Picker>
            </View>
            <Spacer />
            <View style={styles.dropDown}>
                <Picker
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    selectedValue={localitate}
                    onValueChange={(itemValue) => {
                        setLocalitate(itemValue);
                        console.log(itemValue);
                    }}
                >
                    <Picker.Item label="--Selectati localitatea--" value={0} key={0} />
                    {renderLocalitati()}
                </Picker>
            </View>
            <Spacer />
            <DatePicker
                placeholder={"Data nasterii"}
                format={"DD.MM.YYYY"}
                mode={"date"}
                showIcon={false}
                style={{width: '95%'}}
                onDateChange={date => setDataNastere(date)}
                date={dataNastere}
            />
            <ButtonGroup buttons={['Barbat', 'Femeie']} onPress={setGen} selectedIndex={gen} />
        </View>
    );
};

ProfilForm.defaultProps = {};

ProfilForm.propTypes = {};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    picker: {
        height: Platform.OS === 'android' ? 50 : 132,
    },
    pickerItem: {
        height: Platform.OS === 'android' ? 50 : 132,
    },
    dropDown: {
        justifyContent: 'center',
        // borderWidth: 1,
        // borderColor: '#2796D6',
        height: Platform.OS === 'android' ? 50 : 132,
        borderRadius: 5,
        marginBottom: 5,
        width: '100%'
    },
});

export default ProfilForm;