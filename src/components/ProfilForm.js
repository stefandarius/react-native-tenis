import React, {useContext, useEffect, useState} from 'react';
import {Alert, Picker, ScrollView, StyleSheet, View} from "react-native";
import {Button, ButtonGroup, Input, Text} from "react-native-elements";
import Spacer from "./Spacer";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import AppContext from "../context/AppContext";
import {createSportiv, getLocalitatiByJudetId, updateSportiv} from "../network/ApiAxios";
import WaitAction from "./WaitAction";
import LabelHeader from "./LabelHeader";
import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";
import {getDataForKey, storeDataForKey} from "../utils/Utility";

const ProfilForm = ({navigation}) => {

    const [nume, setNume] = useState('');
    const [prenume, setPrenume] = useState('');
    const [telefon, setTelefon] = useState('');
    const [gen, setGen] = useState(0);
    const [dataNastere, setDataNastere] = useState(new Date());
    const [greutate, setGreutate] = useState('');
    const [inaltime, setInaltime] = useState('');
    const [judet, setJudet] = useState(0);
    const [localitate, setLocalitate] = useState(0);
    const [localitati, setLocalitati] = useState([]);
    const [loading, setLoading] = useState(false);
    const [stareSanatate, setStareSanatate] = useState(0);
    const [nivel, setNivel] = useState(0);
    const [editMode, setEditMode] = useState(false);

    const {data, user, setUser} = useContext(AppContext);

    const {detalii} = user;
    const {profil} = detalii;

    useEffect(() => {
        const fillForm = async () => {
            if (detalii) {
                setEditMode(true);
                setNume(profil.nume);
                setPrenume(profil.prenume);
                setGen(profil.gen);
                //setDataNastere(moment(profil.data_nastere).utc().format());
                setTelefon(profil.telefon);
                setJudet(profil.judet);
                await fetchLocalitati(profil.judet);
                setLocalitate(profil.localitate);
                setNivel(detalii.nivel);
                setStareSanatate(detalii.stare_sanatate);
                setInaltime(detalii.inaltime.toString());
                setGreutate(detalii.greutate.toString());
            }
        };
        fillForm();
    }, []);

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

    const saveProfile = async () => {
        let registerResponse;
        console.log("SAVE profil form", gen);
        if (!setEditMode) {
            registerResponse = await createSportiv(nume, prenume, moment(dataNastere).format("DD.MM.YYYY"),
                nivel, greutate, inaltime, stareSanatate, telefon, localitate, gen);
        } else {
            registerResponse = await updateSportiv(detalii.id, nume, prenume, moment(dataNastere).format("DD.MM.YYYY"),
                nivel, greutate, inaltime, stareSanatate, telefon, localitate, gen);
        }
        const response = registerResponse.data;
        const {data, success, message} = response;
        if (success) {
            await storeDataForKey('profil', data);
            setUser({
                ...user,
                detalii: data
            });
            if (setEditMode) {
                navigation.pop();
                return;
            }
            navigation.navigate("Main");
        } else {
            Alert.alert(message);
        }
    };

    const detaliiSportivi = (afiseaza) => {
        return afiseaza ?
            <View>
                <Input value={inaltime} keyboardType={"numeric"} label="Inaltime" onChangeText={setInaltime}/>
                <Input value={greutate} keyboardType={"numeric"} label="Greutate" onChangeText={setGreutate}/>
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
            <ScrollView style={{width: "100%"}}>
                <Spacer marginVertical={20}/>
                <LabelHeader textSize={24} style={{fontWeight: 'bold'}}>Detalii profil</LabelHeader>
                <Spacer marginVertical={20}/>
                <Input value={nume} label={"Nume"} onChangeText={setNume}/>
                <Input value={prenume} label={"Prenume"} onChangeText={setPrenume}/>
                <Input value={telefon} label={"Telefon"} keyboardType={"numeric"} onChangeText={setTelefon}/>
                <Spacer/>
                <RNDateTimePicker
                    placeholder={"Data nasterii"}
                    format={"DD.MM.YYYY"}
                    mode={"date"}
                    display={"calendar"}
                    maximumDate={new Date()}
                    style={{width: '100%', paddingHorizontal: 10}}
                    onChange={(event, date) => setDataNastere(date)}
                    value={dataNastere}
                />
                <ButtonGroup buttons={['Femeie', 'Barbat']} onPress={setGen} selectedIndex={gen}/>
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
                <Button containerStyle={styles.buttonStyle} title={"SAVE"} onPress={saveProfile}/>
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
    buttonStyle: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
        marginBottom: 10
    }
});

export default ProfilForm;