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
    StatusBar,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import LoginScreen from './src/screens/LoginScreen';
import SportiviList from "./src/components/SportiviList";
import SplashScreen from "./src/screens/SplashScreen";
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';

const Login = createStackNavigator({
    Log: {
        screen: LoginScreen,
        navigationOptions:{
            headerShown:false
        }
    },
    ForgotPass: {
        screen: ForgotPasswordScreen,
        navigationOptions:{
            title : 'Recuperare parola',
        }
    }
});

const MainNavigator = createStackNavigator({
   Lista: {
       screen: SportiviList
   }
});

const Switch = createSwitchNavigator({
    Splash: {
        screen: SplashScreen
    },
    Login: Login,
    Main: MainNavigator,
}, {
    initialRouteName: 'Splash'
});

const AppContainer = createAppContainer(Switch);

const App = () => {
    return (
        <AppContainer>
            <StatusBar barStyle="dark-content" backgroundColor="white"/>
        </AppContainer>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});

export default App;
