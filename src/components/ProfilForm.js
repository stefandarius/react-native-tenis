import React, {useContext, useState} from 'react';
import {Picker, StyleSheet, View} from "react-native";
import {ButtonGroup, Input} from "react-native-elements";
import Spacer from "./Spacer";
import DatePicker from "react-native-datepicker";
import AppContext from "../context/AppContext";

const ProfilForm = () => {

    const [gen, setGen] = useState(0);
    const [dataNastere, setDataNastere] = useState(null);

    const {data} = useContext(AppContext);

    const updateGender = (selectedIndex) => {
        setGen(selectedIndex);
    };

    const {selectedIndex} = gen;

    return (
        <View style={styles.container}>
            <Input label={"Nume"} />
            <Input label={"Prenume"} />
            <Input label={"Telefon"} keyboardType={"numeric"} />
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
            <ButtonGroup buttons={['Barbat', 'Femeie']} onPress={updateGender} selectedIndex={selectedIndex} />
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
    }
});

export default ProfilForm;