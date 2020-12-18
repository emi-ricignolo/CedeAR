import React, {useState, useEffect} from 'react';
import { Alert, TouchableNativeFeedback, View, Text, StyleSheet } from 'react-native';
import {tickerInfo} from "../info/tickerinfo";

export default function Tick(props) {
    const {setIndividualPage, valorliqui, individualselected, setIndividualSelected, api_token, base_url, name, cantidad, tick, setTick, saldo, setSaldo, DeleteTick, calcularSaldoTotal} = props;
    const [price, setPrice] = useState(0);
    const [hora, setHora] = useState("");
    const [fecha, setFecha] = useState("");
    const [total, setTotal] = useState(0);
    const [variacion, setVariacion] = useState(0);
    const [colorvariacion, setColorVar] = useState(true);
    const [radio, setRadio] = useState("");
    const [titulo, setTitulo] = useState("");

    function getData(name){
        const url = `${base_url}/stock/${name}/intraday-prices?chartLast=1&token=${api_token}`
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            const pric = data[data.length - 1]["close"].toFixed(2);
            const open = data[data.length - 1]["open"].toFixed(2);
            tickerInfo.map(el => {
                if(el.simbolo === name){
                    setRadio(el.ratio);
                    setTitulo(el.titulo);
                    if(el.ratio.includes(":")){
                        const rat = el.ratio;
                        const ratioconst = rat.charAt(rat.length-1);
                        const ratioc = parseInt(ratioconst);
                        const newprice = (pric * ratioc) * valorliqui;
                        const precioultim = newprice.toFixed(2);
                        console.log(precioultim);
                        setPrice(precioultim);
                        setTotal((precioultim * cantidad).toFixed(2));
                        agregarAtick(name, (precioultim * cantidad).toFixed(2));
                        
                    } else {
                        const rationum = parseInt(el.ratio);
                        const precioparse = parseFloat(pric);
                        const newprice2 = (precioparse / rationum) * valorliqui;
                        const precioultim2 = newprice2.toFixed(2);
                        setPrice(precioultim2);
                        console.log(precioultim2);
                        setTotal((precioultim2 * cantidad).toFixed(2));
                        agregarAtick(name, (precioultim2 * cantidad).toFixed(2));
                    }
                }
            })
            setHora(data[data.length - 1]["minute"]);
            setFecha(data[data.length - 1]["date"]);
            setVariacion((parseFloat(pric) - parseFloat(open)).toFixed(2));
        })
    }

    function agregarAtick(name, total){
        tick.map(tok => {
            if(tok.name === name){
                tok.saldot = total;
            }
        })
        calcularSaldoTotal()
        console.log(total);
    }


    function setVarianza(){
        if(variacion > 0){
            setColorVar(true);
        } else {
            setColorVar(false);
        }
    }

    function setIndv(){
        setIndividualSelected(name);
        setIndividualPage(true);
    }

    function forDelete() {
        Alert.alert(
          'Borrar',
          `Desea borrar el CEDEAR: ${titulo}?`,
          [
            {text: 'NO', style: 'cancel'},
            {text: 'SI', onPress: () => DeleteTick(name)},
          ]
        );
      }

    useEffect(() => {
        getData(name),
        setVarianza()
    }, [valorliqui])

    if(price === 0){
        return(
            <Text style={styles.loadingtext}>Cargando...</Text>
        )
    } else{
        return(
            <TouchableNativeFeedback onPress={() => setIndv()} onLongPress={() => forDelete()}>
                <View style={styles.card}>
                    <View style={styles.leftsidecard}>
                        <Text style={styles.tockname}>{name}</Text>
                        <Text style={styles.tockname2}>{titulo}</Text>
                        <Text style={styles.tockupdate}>Actualizado: {fecha}</Text>
                        <Text style={styles.tockupdate}>Hora: {hora}</Text>
                        <Text style={styles.tockupdate}>Cantidad: {cantidad}</Text>
                    </View>
                    <View style={styles.pricesection}>
                        <Text style={styles.tockprice}>ARS ${price}</Text>
                        <Text style={styles.variacion}>Diaria: <Text style={colorvariacion ? styles.varganancia : styles.varperdida}>USD ${variacion}</Text></Text>
                        <Text style={styles.tockcomprado}>Total: ${total}</Text>
                        <Text style={styles.tockcomprado}>Ratio: {radio}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const styles = StyleSheet.create({
    loadingtext:{
        textAlign:"center",
        padding:20,
        opacity:.3,
    },
    pricesection:{
        alignItems:"flex-end",
        justifyContent:"space-between",
    },
    card:{
        marginTop:15,
        marginBottom:2,
        backgroundColor:"white",
        borderRadius:5,
        padding:10,
        alignSelf:"center",
        width:"94%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    tockname:{
        fontWeight:"bold",
        color:"black",
    },
    tockname2:{
        color:"#593189",
        fontWeight:"bold",
        fontSize:11,
        textTransform:"capitalize",
    },
    tockupdate:{
        fontWeight:"300",
        fontSize:12,
        opacity:.5,
    },
    tockcomprado:{
        fontWeight:"300",
        fontSize:11,
        opacity:.5,
    },
    variacion:{
        fontSize:11,
    },
    varperdida:{
        color:"red",
    },
    varganancia:{
        color:"green",
    },
    tockprice:{
        color:"darkgreen",
        padding:5,
        borderRadius:5,
        backgroundColor:"#E5FEE4",
    },
})
