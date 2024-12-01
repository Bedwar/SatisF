import React from 'react';
import { Text, View } from 'react-native';

import globalStyles from '../styles/globalStyles';



const Agradecimento = () => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>
        Obrigado por participar da pesquisa!
      </Text>
      <Text style={globalStyles.title}>Aguardamos você no próximo ano!</Text>
    </View>
  );
};

export default Agradecimento;
