import React, {useContext, useEffect, useState} from 'react';
import {Picker, ScrollView, StatusBar, StyleSheet, View} from "react-native";
import {Button, ButtonGroup, Header, Input} from "react-native-elements";
import Spacer from "./Spacer";
import DatePicker from "react-native-datepicker";
import AppContext from "../context/AppContext";
import {createSportiv, getLocalitatiByJudetId} from "../network/ApiAxios";
import WaitAction from "./WaitAction";
import LabelHeader from "./LabelHeader";

const ProfilForm = () => {

    const [gen, setGen] = useState(0);
    const [dataNastere, setDataNastere] = useState(null);
    const [judet, setJudet] = useState(0);
    const [localitate, setLocalitate] = useState(0);
    const [localitati, setLocalitati] = useState([]);
    const [loading, setLoading] = useState(false);
    const [stareSanatate, setStareSanatate] = useState(0);
    const [nivel, setNivel] = useState(0);

    const {data} = useContext(AppContext);

    useEffect(() => {

    }, [data]);

    const renderJudete = () => {
        return data.judete.map((item) => {
            return <Picker.Item label={item.nume} value={item.id} key={item.id}/>;
        });
    };

    const renderLocalitati = () => {
        return localitati.map((item) => {
            return <Picker.Item label={item.nume} value={item.id} key={item.id}/>;
        });
    };

    const renderStariSanatate = () => {
        return data.stariSanatate.map((item) => {
            return <Picker.Item label={item.nume} value={item.id} key={item.id}/>;
        });
    };

    const renderNiveluri = () => {
        return data.niveluri.map((item) => {
            return <Picker.Item label={item.nume} value={item.id} key={item.id}/>;
        });
    };

    const fetchLocalitati = async (id) => {
        setLoading(true);
        let allData = [];
        let morePagesAvailable = true;
        let currentPage = 0;
        while (morePagesAvailable) {
            currentPage++;
            const response = await getLocalitatiByJudetId(id, currentPage);
            const {data, success/*, code, message*/} = response.data;
            if (success) {
                const {localitatis, _meta} = data;
                let total = _meta.pageCount;
                localitatis.forEach(e => allData.push(e));//.unshift(e));
                morePagesAvailable = currentPage <= total;
            } else {
                break;
            }
        }
        setLocalitati(allData);
        setLoading(false);
    };

    const saveProfile = () => {
        createSportiv()
    };

    const detaliiSportivi = (afiseaza) => {
        return afiseaza ?
            <View>
                <Input keyboardType={"numeric"} label="Inaltime"/>
                <Input keyboardType={"numeric"} label="Greutate"/>
                <View style={styles.dropDown}>
                    <Picker
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                        selectedValue={stareSanatate}
                        onValueChange={itemValue => setStareSanatate(itemValue)}
                    >
                        <Picker.Item label="--Selectati stare sanatate--" value={0} key={0}/>
                        {renderStariSanatate()}
                    </Picker>
                </View>
                <View style={styles.dropDown}>
                    <Picker
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                        selectedValue={nivel}
                        onValueChange={itemValue => setNivel(itemValue)}
                    >
                        <Picker.Item label="--Selectati nivel--" value={0} key={0}/>
                        {renderNiveluri()}
                    </Picker>
                </View>
            </View> : null;
    };

    return (
        <View style={styles.container}>
            <ScrollView style={{width: "100%"}} >
                <Spacer marginVertical={20}/>
                <LabelHeader textSize={24}>Detalii profil</LabelHeader>
                <Spacer marginVertical={20}/>
                <Input label={"Nume"}/>
                <Input label={"Prenume"}/>
                <Input label={"Telefon"} keyboardType={"numeric"}/>
                <Spacer/>
                <DatePicker
                    placeholder={"Data nasterii"}
                    format={"DD.MM.YYYY"}
                    mode={"date"}
                    showIcon={false}
                    style={{width: '100%', paddingHorizontal: 10}}
                    onDateChange={date => setDataNastere(date)}
                    date={dataNastere}
                />
                <ButtonGroup buttons={['Barbat', 'Femeie']} onPress={setGen} selectedIndex={gen}/>
                <Spacer marginVertical={10}/>
                {detaliiSportivi(true)}
                <View style={styles.dropDown}>
                    <Picker
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                        selectedValue={judet}
                        onValueChange={async (itemValue) => {
                            setJudet(itemValue);
                            fetchLocalitati(itemValue);
                            console.log(itemValue);
                        }}
                    >
                        <Picker.Item label="--Selectati judet--" value={0} key={0}/>
                        {renderJudete()}
                    </Picker>
                </View>
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
                        <Picker.Item label="--Selectati localitatea--" value={0} key={0}/>
                        {renderLocalitati()}
                    </Picker>
                </View>
                <Spacer/>
                <Button title={"SAVE"} onPress={saveProfile}/>
                <WaitAction enabled={loading}/>
            </ScrollView>
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
        paddingHorizontal: 10,
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
});

export default ProfilForm;