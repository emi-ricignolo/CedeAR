import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome, AntDesign, Entypo } from '@expo/vector-icons'; 


export default function Navbar(props) {
    const {individualpage, setIndividualPage, addpage, setAddPage} = props;

    return (
        <View style={styles.navbar}>
            <View style={styles.headerlogo}>
                <FontAwesome name="line-chart" size={18} color="#70FFC5" style={styles.logo}/>
                <Text style={styles.headertitle}>CedeApp</Text>
            </View>
            <View style={styles.headerbuttons}>
                {individualpage ? <FontAwesome name="briefcase" size={20} color="white" style={{marginRight:12}} onPress={() => setIndividualPage(false)} /> : null }
                {addpage ? <Entypo name="cross" size={26} color="white" style={styles.plusadd} onPress={() => setAddPage(false)} /> : <AntDesign name="plus" size={26} color="white" style={styles.plusadd} onPress={() => setAddPage(true)}/>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar:{
        backgroundColor:"#603890",
        padding:18,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        borderBottomColor:"black",
        shadowColor: "#411E6B",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    headertitle:{
        color:"white",
        fontWeight:"bold",
        fontSize:16,
        fontStyle:"italic",
    },
    headerlogo:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
    },
    logo:{
      marginRight:8,
    },
    headerbuttons:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
    },
    plusadd:{
        marginLeft:15,
    },
});