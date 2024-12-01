import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
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
    <View style={globalStyles.container}>
      <Text style={globalStyles.question}>
        O que você achou do {titulo}?
      </Text>
      <View style={globalStyles.optionsContainer}>
        <TouchableOpacity
          style={globalStyles.optionButton}
          onPress={() => handleOptionSelect('pessimo')}>
          <Icon name="emoticon-cry-outline" size={50} color="red" />
          <Text style={globalStyles.optionText}>Péssimo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.optionButton}
          onPress={() => handleOptionSelect('ruim')}>
          <Icon name="emoticon-sad-outline" size={50} color="#ff6347" />
          <Text style={globalStyles.optionText}>Ruim</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.optionButton}
          onPress={() => handleOptionSelect('neutro')}>
          <Icon name="emoticon-neutral-outline" size={50} color="#ffd700" />
          <Text style={globalStyles.optionText}>Neutro</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.optionButton}
          onPress={() => handleOptionSelect('bom')}>
          <Icon name="emoticon-happy-outline" size={50} color="chartreuse" />
          <Text style={globalStyles.optionText}>Bom</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.optionButton}
          onPress={() => handleOptionSelect('excelente')}>
          <Icon name="emoticon-excited-outline" size={50} color="#32cd32" />
          <Text style={globalStyles.optionText}>Excelente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Coleta;
