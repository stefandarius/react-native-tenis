import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import {withNavigation} from 'react-navigation'

const HyperLink = ({title,containerStyle,textStyle,route,data,navigation}) =>{
    return <TouchableOpacity style={[styles.container,containerStyle]} onPress={()=>navigation.navigate(route, data)}>
        <Text style={[styles.text,textStyle]}>{title}</Text>
        
    </TouchableOpacity>
};

HyperLink.defaultProps = {
    title: 'here it goes the title pop', 
    route: '',
    data:{},
    textStyle:{},
    containerStyle:{},

}

const styles = StyleSheet.create({
    container:{

    },
    text:{
        fontWeight:'bold',
        color:'cyan',
    }
});


export default withNavigation(HyperLink);