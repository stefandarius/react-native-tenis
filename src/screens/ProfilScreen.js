import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, Dimensions, Image, Alert} from "react-native";
import {Text} from "react-native-elements";
import BigButton from "../components/BigButton";
import AppContext from "../context/AppContext";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {removeDataForKey} from "../utils/Utility";

const {width: wwidth, height: wheight} = Dimensions.get('window');

const ProfilScreen = ({navigation}) => {

    const {user, setUser} = useContext(AppContext);
    const datePersonale = {...user.detalii.profil};

    useEffect(() => {
        console.log("Profil", datePersonale);
    }, []);

    const onLogOutHandler = async () => {
        Alert.alert(
            'Log Out?',
            'Are you sure you want to log out? You will need to log in again to use the app.',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: async () => {
                        await removeDataForKey('user');
                        navigation.navigate('Splash');
                        setUser(null);
                    }},
            ],
            { cancelable: false }
        )
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileDetails}>
                <Image style={styles.roundImage}
                       source={{uri: "https://ggia.berkeley.edu/assets/general/GGIA-HumanFace.jpg",}}/>
                <Text style={styles.text} h4>{datePersonale.nume} {datePersonale.prenume}</Text>
                <Text style={styles.text} h5>{user.rol.toUpperCase()}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <BigButton
                    clicked={() => navigation.navigate("UserDetails")}
                    text={"User Details"}
                    style={{width: wwidth / 3}}
                    src={{uri: "https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/hint.png"}}
                />
                <BigButton
                    clicked={() => Alert.alert("apasat")}
                    text={"Schedule"}
                    style={{width: wwidth / 3}}
                    src={{uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Circle-icons-calendar.svg/1200px-Circle-icons-calendar.svg.png"}}
                />
            </View>
            <View style={{flexDirection: 'row'}}>
                <BigButton
                    clicked={() => Alert.alert("apasat")}
                    text={"Statistics"}
                    style={{width: wwidth / 3}}
                    src={{uri: "https://cdn3.iconfinder.com/data/icons/bitcoin-cryptocurrency/512/Icon_47-512.png"}}
                />
                <BigButton
                    clicked={() => Alert.alert("apasat")}
                    text={"History"}
                    style={{width: wwidth / 3}}
                    src={{uri: "https://iconsetc.com/icons-watermarks/flat-circle-white-on-blue/raphael/raphael_clock-history/raphael_clock-history_flat-circle-white-on-blue_512x512.png"}}
                />
            </View>
            <View style={{flexDirection: 'row'}}>
                <BigButton
                    clicked={() => Alert.alert("apasat")}
                    text={"Settings"}
                    style={{width: wwidth / 3}}
                    icon={<MaterialCommunityIcons name={"settings"} size={30} color="green" />}
                />
                <BigButton
                    clicked={onLogOutHandler}
                    text={"Log Out"}
                    style={{width: wwidth / 3}}
                    icon={<MaterialCommunityIcons name={"logout"} size={30} color="red" />}
                />
            </View>
        </View>
    );
};

ProfilScreen.defaultProps = {};

ProfilScreen.propTypes = {};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fcfdff",
        flex: 1,
        padding: 50,
    },
    profileDetails: {
        backgroundColor: "#3060d1",
        borderWidth: 0,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
        justifyContent: 'center',
        alignItems: 'center',
        height: wheight / 3,
        marginTop: 30,
        marginBottom: 20
    },
    roundImage: {
        width: 90,
        height: 90,
        borderWidth: 6,
        borderColor: 'white',
        borderRadius: 45,
        marginBottom: 15
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
    },
    imageProfile: {
        width: 70,
        height: 70
    }
});

export default ProfilScreen;