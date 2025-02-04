import React from 'react';
import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import CardPesquisa from '../componentes/CardPesquisa';
import globalStyles from '../styles/globalStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Home = (props) => {

    // Simulação de dados de pesquisa
    const researchData = [
        { title: 'SECOMP 2023', date: '10/10/2023', image: require('../../assets/images/secomp-icon.png') },
        { title: 'UBUNTU 2022', date: '05/06/2022', image: require('../../assets/images/ubuntu-icon.png') },
        { title: 'MENINAS CPU', date: '01/04/2022', image: require('../../assets/images/meninas-icon.png') }
 
    ];

  const showNovaPesquisa = () => {
    props.navigation.navigate('NovaPesquisa');
  }; 

 /*  const showAcoesPesquisa = research => {
    props.navigation.navigate('AcoesPesquisa', {research: research});
  };
 */
  return (
    <View style={globalStyles.container}>
     
    
     <View style={globalStyles.areaButtons}>
    
        <TextInput
          style={globalStyles.inputs}
          placeholder="Insira o termo de busca..."
          left={ <TextInput.Icon  color='grey'size={40}icon="magnify" />}

        />
     </View>
    
      <ScrollView 
        horizontal={true}>
        {researchData.map((research, index) => {
          return (
            <TouchableOpacity  style={globalStyles.researchCard}
              key={index}
             
              onPress={() => {
                showAcoesPesquisa(research);
              }}>
              <CardPesquisa item={research} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
     
      <View style={globalStyles.areaButtons}>
      <TouchableOpacity style={globalStyles.buttonVerde} onPress={showNovaPesquisa}>
        <Text style={globalStyles.buttonText}>NOVA PESQUISA</Text>
      </TouchableOpacity>
      </View>

    </View>
  );
};

export default Home;
