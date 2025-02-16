import React from 'react';
import { Text, TouchableOpacity, View,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import globalStyles from '../styles/globalStyles';


const Coleta = props => {
  const research = props.route.params.research;
  const titulo = research.title;

  const handleOptionSelect = option => {
    props.navigation.navigate('Agradecimento');
    setTimeout(
      () => props.navigation.navigate('AcoesPesquisa', {research: research}),
      3000,
    );
  };

  return (
    <ScrollView contentContainerStyle={globalStyles.containerLogin}>
      
      
       
      <View style={globalStyles.headerLogin }>
      <Text style={globalStyles.headerLogin}>
        O que você achou do {titulo}?
      </Text>
      </View>
      <View style={globalStyles.content2}>
        <TouchableOpacity
          style={globalStyles.contentColeta}
          onPress={() => handleOptionSelect('pessimo')}>
          <Icon name="emoticon-cry-outline" size={50} color="red" />
          <Text style={globalStyles.AcoesText}>Péssimo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.contentColeta}
          onPress={() => handleOptionSelect('ruim')}>
          <Icon name="emoticon-sad-outline" size={50} color="#ff6347" />
          <Text style={globalStyles.AcoesText}>Ruim</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.contentColeta}
          onPress={() => handleOptionSelect('neutro')}>
          <Icon name="emoticon-neutral-outline" size={50} color="#ffd700" />
          <Text style={globalStyles.AcoesText}>Neutro</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.contentColeta}
          onPress={() => handleOptionSelect('bom')}>
          <Icon name="emoticon-happy-outline" size={50} color="chartreuse" />
          <Text style={globalStyles.AcoesText}>Bom</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.contentColeta}
          onPress={() => handleOptionSelect('excelente')}>
          <Icon name="emoticon-excited-outline" size={50} color="#32cd32" />
          <Text style={globalStyles.AcoesText}>Excelente</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Coleta;
