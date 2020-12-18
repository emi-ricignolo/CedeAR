import React from 'react';
import { StyleSheet, ScrollView, View, Text, Dimensions } from 'react-native';
import Tick from "../components/Tick";
import LowBar from "../components/LowBar";
const screenWidth = Dimensions.get('window').width;

export default function Dashboard(props) {
    const {api_token, base_url, valorliqui, tick, setTick, DeleteTick, calcularSaldoTotal, saldototal, individualselected, setIndividualSelected, setIndividualPage} = props;

    return (
        <View style={styles.dash}>
            <LowBar valorliqui={valorliqui} tick={tick} saldototal={saldototal} />
            <ScrollView style={StyleSheet.scrollboard}>
                {tick.map(elemento => <Tick key={elemento.name} tick={tick} valorliqui={valorliqui} setTick={setTick} calcularSaldoTotal={calcularSaldoTotal} setIndividualPage={setIndividualPage} DeleteTick={DeleteTick} name={elemento.name} cantidad={elemento.cantidad} valorliqui={valorliqui} api_token={api_token} base_url={base_url}  individualselected={individualselected} setIndividualSelected={setIndividualSelected}/> )}
                <View style={{height: 180}} />
            </ScrollView>
        </View>
        
    )
}

const styles = StyleSheet.create({
    scrollboard:{
        backgroundColor:"#F0F1F6",
        alignItems:"center",
        width:screenWidth,
    }
})