import React, {useState, useEffect} from 'react';
import { TouchableOpacity, StyleSheet, View, Text, TextInput } from 'react-native';
import {tickerInfo} from "../info/tickerinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AddPage(props) {
    const {tick, setTick} = props;

    const [currentick, setCurrentTick] = useState("");
    const [currentCuantity, setCuantity] = useState(0);

    const onAdd = () => {
        setTick([...tick, {
            name: currentick,
            cantidad: currentCuantity,
            saldot:0,
        }])
        setCurrentTick("");
        setCuantity(0);
      };

    useEffect(() => {saveData()}, [currentCuantity])

    const saveData = async () => {
        try {
          const nuevoarray = JSON.stringify(tick);
          await AsyncStorage.setItem(
            "tickarray",
            nuevoarray
          );
        } catch (error) {
          console.log("Error Guardando data")
        }
      };

    return (
        <View style={styles.addpagecontainer}>
            <Text style={styles.addpagtext}>Agrega el Ticker (Ej: AAPL para Apple):</Text>
            <TextInput style={styles.addpageinp} autoCapitalize="characters" onChangeText={text => setCurrentTick(text)} value={currentick} />
            <Text style={styles.addpagtext}>Cantidad:</Text>
            <TextInput style={styles.addpageinp} keyboardType="numeric" onChangeText={text => setCuantity(text)} value={currentCuantity} />
            <TouchableOpacity onPress={onAdd} style={styles.addbtn}>
                <Text style={styles.addbtntxt}>Agregar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    addpagecontainer:{
        padding:30,
        alignItems:"center",
        backgroundColor:"#593189",
        height:"100%",
    },
    addpagtext:{
        color:"white",
        marginTop:8,
        marginBottom:8,
    },
    addpageinp:{
        backgroundColor:"#603890",
        padding:4,
        color:"white",
        width:"80%",
    },
    addbtn:{
        backgroundColor:"#70FFC5",
        marginTop:14,
        alignItems:"center",
        width:"80%",
        padding:8,
    },
    addbtntxt:{
        fontWeight:"600",
        color:"#593189",
    }
})
