import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Navbar from "./components/Navbar";
import AddPage from "./pages/AddPage";
import Individual from "./pages/Individual";
import Dashboard from "./pages/Dashboard";
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const statusbarh = Constants.statusBarHeight;

export default function App() {
  const [individualpage, setIndividualPage] = useState(false);
  const [addpage, setAddPage] = useState(false);
  const [tick, setTick] = useState([]);
  const [saldototal, setSaldoTotal] = useState(0);
  const [individualselected, setIndividualSelected] = useState("")

  const loadData = async () => {
    try {
      const arload = await AsyncStorage.getItem("tickarray");
      if(arload !== null){
        setTick(JSON.parse(arload));
      } else {
        setTick([]);
      }
    } catch (error) {
      console.log("Error Cargando Data")
    }
  };

  const api_token = "pk_162e5340d93943fe8d5a2c8d5b9254e7";
  const base_url = "https://cloud.iexapis.com/stable";

  function DeleteTick(dato){
    const arrayfiltrado = tick.filter(item => item.name !== dato);
    setTick(arrayfiltrado);
    if(tick.length === 1){
      removeData();
      saveData([]);
      let totals = 0;
      tick.map(elemento => {
        if(elemento.name === dato ){
          console.log("nada");
        } else {
          totals += parseFloat(elemento.saldot);
        }
      })
      setSaldoTotal(totals.toFixed(0));
    } else {
      removeData();
      saveData(arrayfiltrado);
      let totals = 0;
      tick.map(elemento => {
        if(elemento.name === dato ){
          console.log("nada");
        } else {
          totals += parseFloat(elemento.saldot);
        }
      })
      setSaldoTotal(totals.toFixed(2));
    }
  };  

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem("tickarray");
    } catch (error) {
      console.log("Error borrando data")
    }
  }

  const saveData = async (saved) => {
    try {
      const nuevoarray = JSON.stringify(saved);
      await AsyncStorage.setItem(
        "tickarray",
        nuevoarray
      );
    } catch (error) {
      console.log("Error Guardando data")
    }
  };

  function calcularSaldoTotal(){
    let totals = 0;
    tick.map(elemento => {
      totals += parseFloat(elemento.saldot);
    })
    setSaldoTotal(totals.toFixed(2));
  }

  const [valorliqui, setValorLiqui] = useState(0);
  function ApiLiqui(){
    const urlq = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"
      fetch(urlq)
        .then((res) => res.json())
        .then((data) => {
          const obj = data.find(ob => ob["casa"]["nombre"] === 'Dolar Contado con Liqui');
          const precioliqui = obj["casa"]["venta"];
          const stringliqui = precioliqui.replace(/,/g, '.');
          const numberliqui = parseFloat(stringliqui);
          setValorLiqui(numberliqui);
        });
  }

  useEffect(() => {
    ApiLiqui()
    loadData()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#603890" />
      <Navbar individualpage={individualpage} setIndividualPage={setIndividualPage} addpage={addpage} setAddPage={setAddPage} /> 
      {individualpage ? <Individual api_token={api_token} base_url={base_url} individualselected={individualselected} setIndividualSelected={setIndividualSelected} /> : addpage ? <AddPage setTick={setTick} tick={tick} /> : <Dashboard tick={tick} setIndividualPage={setIndividualPage} setTick={setTick} valorliqui={valorliqui} DeleteTick={DeleteTick} saldototal={saldototal} calcularSaldoTotal={calcularSaldoTotal} api_token={api_token} base_url={base_url}  individualselected={individualselected} setIndividualSelected={setIndividualSelected}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:statusbarh,
    flex: 1,
    backgroundColor:"#F0F1F6",
  },
});
