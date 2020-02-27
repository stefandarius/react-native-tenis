import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';



const LabelHeader =(props)=>{

    return (<View style={styles.container}>
            <Text style={[styles.textStyle,{fontSize:props.textSize,color:props.color},props.style]}>
                {props.children}
            </Text>
        </View>)
};

const styles=StyleSheet.create({
    container:{
        width:'100%',
        alignItems:'center',
        paddingVertical:5
        
    },
    textStyle:{
        fontWeight:'bold'
    }
});

LabelHeader.defaultProps = {
    color:'black',
    textSize:20
};

LabelHeader.propTypes={
    color:PropTypes.string,
    textSize:PropTypes.number
}

export default LabelHeader;