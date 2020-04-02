/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
    StyleSheet,
    StatusBar, View, SafeAreaView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import LoginScreen from './src/screens/LoginScreen';
import SportiviList from "./src/components/SportiviList";
import SplashScreen from "./src/screens/SplashScreen";
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import RegisterScreen from "./src/screens/RegisterScreen";
import ProfilForm from "./src/components/ProfilForm";
import {TenisProvider} from "./src/context/AppContext";
import MainScreen from "./src/screens/MainScreen";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import ProfilScreen from "./src/screens/ProfilScreen";

const LoginNavigator = createStackNavigator({
    Log: {
        screen: LoginScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    Reg: {
        screen: RegisterScreen,
        navigationOptions: {
            headerShown: false
        }
    }
});

const ListaNavigator = createStackNavigator({
    Profil: {
        screen: ProfilForm,
        navigationOptions: {
            headerShown: false
        }
    },
    Lista: {
        screen: SportiviList
    }
}, {
    initialRouteName: 'Lista'
});

const ProfilNavigator = createStackNavigator({
    ProfilUser: {
        screen: ProfilScreen
    }
});

const MainNavigator = createMaterialBottomTabNavigator({
    ListaSportivi: {
        screen: ListaNavigator,
        navigationOptions: {
            title: "Lista Sportivi",
            tabBarIcon: ({tintColor}) => <FontAwesome name={"list-alt"} size={25} color={tintColor}/>,
            tabBarColor: '#2796D6'
        }
    },
    ProfilUtilizator: {
        screen: ProfilNavigator,
        navigationOptions: {
            title: "Profil",
            tabBarIcon: ({tintColor}) => <FontAwesome name={"user-o"} size={25} color={tintColor}/>,
            tabBarColor: 'indigo'
        }
    }
}, {
    initialRouteName: 'ListaSportivi',
    activeColor: '#ffffff',
    inactiveColor: '#024f9e',
    labeled: true,
    shifting: true,
    barStyle: {
        backgroundColor: '#2796D6',
        height: 80
    }
});
//     createStackNavigator({
//     Lista: {
//         screen: SportiviList
//     },
//     MainS: {
//         screen: MainScreen
//     },
//     Profil: {
//         screen: ProfilForm,
//         navigationOptions: {
//             headerShown: false
//         }
//     }
// }, {
//     initialRouteName: 'MainS'
// });

const Switch = createSwitchNavigator({
    Splash: {
        screen: SplashScreen
    },
    Login: LoginNavigator,
    Main: MainNavigator,
}, {
    initialRouteName: 'Splash'
});

const AppContainer = createAppContainer(Switch);

const App = () => {
    return (
        <TenisProvider>
            <StatusBar barStyle="dark-content" backgroundColor="white"/>
            <AppContainer/>
        </TenisProvider>
    );
};

export default App;
