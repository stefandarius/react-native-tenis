/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StatusBar} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LoginScreen from './src/screens/LoginScreen';
import SportiviList from "./src/components/SportiviList";
import SplashScreen from "./src/screens/SplashScreen";
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import RegisterScreen from "./src/screens/RegisterScreen";
import ProfilForm from "./src/components/ProfilForm";
import {TenisProvider} from "./src/context/AppContext";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import ProfilScreen from "./src/screens/ProfilScreen";
import UserDetailsScreen from "./src/screens/UserDetailsScreen";
import EditButton from "./src/components/EditButton";
import AntrenamenteScreen from "./src/screens/AntrenamenteScreen";

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
    },
    Profil: {
        screen: ProfilForm,
        navigationOptions: {
            headerShown: false
        }
    }
});

const ListaNavigator = createStackNavigator({
    Lista: {
        screen: SportiviList,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#2796D6',
            },
            headerTintColor: 'white'
        }
    }
}, {
    initialRouteName: 'Lista'
});

const AntrenamenteNavigator = createStackNavigator({
    Lista: {
        screen: AntrenamenteScreen,
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'white',
            },
            title: "Antrenamente",
            headerTintColor: 'black'
        },
    },
    initialRouteName: 'Lista'
});

const ProfilNavigator = createStackNavigator({
    ProfilUser: {
        screen: ProfilScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    UserDetails: {
        screen: UserDetailsScreen,
        navigationOptions: ({navigation}) => ({
            title: "User Details",
            headerStyle: {
                backgroundColor: '#3060d1',
                height: 100
            },
            headerTitleStyle: {
                fontSize: 30
            },
            headerTintColor: 'white',
            headerRight: () => <EditButton navigation={navigation} />,
        })
    },
    ProfilForm: {
        screen: ProfilForm,
        navigationOptions: {
            headerShown: true
        }
    }
}, {
    initialRouteName: 'ProfilUser'
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
            tabBarColor: '#3060d1'
        }
    },
    Antrenamente: {
        screen: AntrenamenteNavigator,
        navigationOptions: {
            title: "Antrenamente",
            tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name={"tennis"} size={25} color={tintColor}/>,
            tabBarColor: '#1ab5ff'
        }
    }
}, {
    initialRouteName: 'ListaSportivi',
    activeColor: '#ffffff',
    inactiveColor: '#d8dde8',
    labeled: true,
    shifting: true,
    barStyle: {
        backgroundColor: '#2796D6',
        height: 80
    }
});

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
