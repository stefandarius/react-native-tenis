import React from 'react';
import { StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

const Spacer = ({marginVertical,children,style})=>{
    const marginStyle=()=>{
        return {
            marginVertical:marginVertical?marginVertical:5,
        }
    };
    return (<View style={[styles.container,marginStyle(),style]}>
        {children}
    </View>);
};

Spacer.propTypes={
    marginVertical:PropTypes.number
};

const styles=StyleSheet.create({
    container:{
        width:'100%',
    }
});

export default Spacer;