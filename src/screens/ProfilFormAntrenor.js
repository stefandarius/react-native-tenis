import React, {useContext, useEffect, useState} from 'react';
import {Alert, Picker, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {Button, ButtonGroup, Input, Text} from "react-native-elements";
import Spacer from "../components/Spacer";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AppContext from "../context/AppContext";
import {
    createAntrenor,
    getLocalitatiByJudetId,
    updateAntrenor,
} from "../network/ApiAxios";
import WaitAction from "../components/WaitAction";
import LabelHeader from "../components/LabelHeader";
import moment from "moment";
import {storeDataForKey} from "../utils/Utility";

const ProfilFormAntrenor = ({navigation}) => {

    const [nume, setNume] = useState('');
    const [prenume, setPrenume] = useState('');
    const [telefon, setTelefon] = useState('');
    const [gen, setGen] = useState(0);
    const [dataNastere, setDataNastere] = useState(new Date());
    const [judet, setJudet] = useState(0);
    const [localitate, setLocalitate] = useState(0);
    const [localitati, setLocalitati] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

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
                setDataNastere(moment(profil.data_nastere, "DD.MM.YYYY").toDate());
                setTelefon(profil.telefon);
                setJudet(profil.judet);
                await fetchLocalitati(profil.judet);
                setLocalitate(profil.localitate);
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
        if (!setEditMode) {
            registerResponse = await createAntrenor(nume, prenume, moment(dataNastere).format("DD.MM.YYYY"),
                telefon, localitate, gen);
        } else {
            registerResponse = await updateAntrenor(detalii.profil.id, nume, prenume, moment(dataNastere).format("DD.MM.YYYY"),
                telefon, localitate, gen);
        }
        const response = registerResponse.data;
        const {data, success, message} = response;
        console.log("Update antrenor", data, success, message);
        if (success) {
            await storeDataForKey('profil', {profil: data, id: data.id});
            setUser({
                ...user,
                detalii: {profil: data, id: data.id}
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

    const handleConfirm = (date) => {
        setIsDatePickerVisible(false);
        setDataNastere(date);
    };

    return (
        <View style={styles.container}>
            <DateTimePickerModal
                date={dataNastere}
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={() => setIsDatePickerVisible(false)}
                maximumDate={new Date()}
            />
            <ScrollView style={{width: "100%"}}>
                <Spacer marginVertical={20}/>
                <LabelHeader textSize={24} style={{fontWeight: 'bold'}}>Detalii profil</LabelHeader>
                <Spacer marginVertical={20}/>
                <Input value={nume} label={"Nume"} onChangeText={setNume}/>
                <Input value={prenume} label={"Prenume"} onChangeText={setPrenume}/>
                <Input value={telefon} label={"Telefon"} keyboardType={"numeric"} onChangeText={setTelefon}/>
                <Spacer/>
                <TouchableOpacity onPress={() => setIsDatePickerVisible(true)}>
                    <View pointerEvents={'box-only'}>
                        <Input value={moment(dataNastere).format("DD.MM.YYYY")} disabled placeholder={"Data nastere"} />
                    </View>
                </TouchableOpacity>
                <ButtonGroup buttons={['Femeie', 'Barbat']} onPress={setGen} selectedIndex={gen}/>
                <Spacer marginVertical={10}/>
                <View style={styles.dropDown}>
                    <Picker
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                        selectedValue={judet}
                        onValueChange={async (itemValue) => {
                            setJudet(itemValue);
                            await fetchLocalitati(itemValue);
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

export default ProfilFormAntrenor;