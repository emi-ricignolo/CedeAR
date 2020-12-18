import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function LowBar(props) {
    const {valorliqui, tick, saldototal} = props;   

    return (
        <View style={styles.lownav}>
            <Text style={styles.textsaldobar}>Saldo: <Text style={styles.saldop}>${saldototal}</Text></Text>
            <Text style={styles.textccl}>CCL: <Text style={styles.textsaldobar}>${valorliqui}</Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    lownav:{
        alignItems:"center",
        justifyContent:"space-between",
        flexDirection:"row",
        backgroundColor:"#593189",
        width:"100%",
        padding:12,
        shadowColor: "#603890",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    
        elevation: 5,
    },
    saldop:{
        color:"#70FFC5",
    },
    textsaldobar:{
        color:"#C6AEE3",
    },
    textccl:{
        color:"#8562AF",
    }
});
  