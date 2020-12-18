import React, {useState, useEffect} from 'react'
import { StyleSheet, TouchableOpacity, TextInput, View, Text, Dimensions } from 'react-native';
import { LineChart, YAxis, Grid } from 'react-native-svg-charts';
import {tickerInfo} from "../info/tickerinfo";

export default function Individual(props) {
    const {api_token, base_url, individualselected} = props;
    const windowWidth = Dimensions.get('window').width;
    const [arrayobjeto, setArrayObjeto] = useState([]);
    const [titulocompleto, setTituloCompleto] = useState("");
    const [indvprecio, setIndvPrecio] = useState("");
    const [indvratio, setIndvRatio] = useState("");
    const [indvdate, setIndvDate] = useState("");
    const [indvtime, setIndvTime] = useState("");
    const [nulo, setNulo] = useState(true);

    function getData(){
        const url = `https://cloud.iexapis.com/stable/stock/${individualselected}/intraday-prices?chartLast=80&token=pk_162e5340d93943fe8d5a2c8d5b9254e7`
            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    setIndvDate(data[data.length - 1]["date"])
                    setIndvTime(data[data.length - 1]["minute"])
                    setIndvPrecio(data[data.length - 1]["close"])
                    let close = 0;
                    data.map(elemento => {
                        close = elemento["close"];
                        agregarObjeto(close);
                    })
                    obtenerNombre();
                })
    }

    function obtenerNombre(){
        tickerInfo.map(el => {
            if(el.simbolo === individualselected){
                setIndvRatio(el.ratio);
                setTituloCompleto(el.titulo)
            }
        })
        
    }

    function setearNulo(){
        if(arrayobjeto[0] === undefined){
            setNulo(true);
        } else {
            setNulo(false);
        }
    }

    function agregarObjeto(close){
        setArrayObjeto(oldArray => [...oldArray, close])
    }

    useEffect(setearNulo, [arrayobjeto])
    useEffect(getData, [individualselected])

    const contentInset = { top: 20, bottom: 20 }

    return(
        <View style={styles.individualpage}>
            {nulo ? <View style={styles.loading}><Text style={styles.loadingtext}>Cargando...</Text></View> : null}
            <Text style={styles.titleindividual}>{titulocompleto} <Text style={styles.titleindtick}>({individualselected})</Text></Text>
            <View style={{ height: 200, flexDirection: 'row' }}>
                <YAxis
                    data={arrayobjeto}
                    contentInset={contentInset}
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={10}
                    formatLabel={(value) => `$${value}`}
                />
                <LineChart
                    style={{ flex: 1, marginLeft: 10, width: windowWidth - 30 }}
                    data={arrayobjeto}
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    contentInset={contentInset}
                    >
                    <Grid />
                </LineChart>
            </View>
            <View style={styles.bottomcard}>
                <View style={styles.bottomcolum}>
                    <Text style={styles.tituloprecio}>Último Precio:</Text>
                    <Text style={styles.titulousd}>USD ${indvprecio}</Text>
                    <Text style={styles.tituloprecior}>Ratio de Cedear:</Text>
                    <Text style={styles.tituloprecio2}>{indvratio}</Text>
                    
                </View>
                <View style={styles.bottomcolum}>
                    <Text style={styles.tituloprecio}>Actualización:</Text>
                    <Text style={styles.tituloprecio2}>{indvdate}</Text>
                    <Text style={styles.tituloprecio2}>{indvtime}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    loading:{
        zIndex:10,
        height:"100%",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"white",
    },
    loadingtext:{
        textAlign:"center",
        color:"grey",
    },
    individualpage:{
        backgroundColor:"white",
        alignItems:"center",
        padding:20,
        height:"100%",
    },
    titleindtick:{
        textTransform:"uppercase",
    },
    titleindividual:{
        fontWeight:"bold",
        fontSize:20,
        marginTop:10,
        marginBottom:20,
        color:"#603890",
        textTransform:"capitalize",
        textAlign:"center",
    },
    titulousd:{
        color:"green",
        fontWeight:"bold",
        textAlign:"left",
        padding:5,
    },
    tituloprecio:{
        color:"black",
        textAlign:"left",
        padding:3,
    },
    tituloprecior:{
        color:"black",
        textAlign:"left",
        padding:3,
        fontSize:12,
        opacity:.8,
    },
    tituloprecio2:{
        fontSize:11,
        color:"black",
        paddingTop:3,
        textAlign:"left",
    },
    bottomcolum:{
        marginRight:10,
        marginLeft:10,
        textAlign:"left",
        alignItems:"center",
    },
    bottomcard:{
        marginTop:20,
        flexDirection:"row",
        justifyContent:"space-between",
        backgroundColor:"white",
        borderRadius:4,
        padding:20,
    },
    titulografico:{
        fontWeight:"bold",
        color:"#603890",
        textAlign:"center",
        padding:2,
        marginBottom:14,
    },
    buttontext:{
        fontWeight:"bold",
        color:"white",
    },
    button:{
        backgroundColor:"#593189",
        padding:12,
    },
    input:{
        padding:8,
        backgroundColor:"#DCDFEC",
        color:"#603890",
        minWidth:200,
    },
    columnpick:{
        flexDirection:"row",
        marginTop:10,
    },
    col:{
        marginLeft:15,
        marginRight:15,
        borderRadius:6,
        padding:8,
    },
    selectedcol:{
        backgroundColor:"#603890",
        borderRadius:6,
        padding:8,
    },
    coltext:{
        color:"#603890",
    },
    selectedtext:{
        color:"white",
    },
    inputplace:{
        flexDirection:"row",
        marginTop:20,
        marginBottom:20,
        alignItems:"center",
        justifyContent:"center",
    }
})

