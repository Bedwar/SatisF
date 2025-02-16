import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import globalStyles from '../styles/globalStyles';



const Relatorio = (props) => {
  
  return (
    <View style={globalStyles.container}>

        <View style={globalStyles.header}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Icon name="arrow-back" size={30} style={globalStyles.headerImg} />
            </TouchableOpacity>
            <Text style={globalStyles.header}>Relatório</Text>
        </View>


        <View style={globalStyles.area}>
             <Image size={80} source={require('../../assets/images/chart.png')} 
       />
      </View>
  
       
    </View>
  );
};

export default Relatorio;
