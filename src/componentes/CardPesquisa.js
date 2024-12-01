import React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';

import globalStyles from '../styles/globalStyles';

export default function CardPesquisa({ item: research }) {
  return (
    <Card>
      <View style={globalStyles.imageContainer}>
        <Card.Cover
          source={research.image}
          style={globalStyles.cardImage}
          resizeMode="contain"
        />
      </View>
      <Card.Content>
        <Text
          variant="titleLarge"
          style={[globalStyles.title, {color: '#3F92C5'}]}>
          {research.title}
        </Text>
        <Text variant="bodyMedium" style={globalStyles.date}>
          {research.date}
        </Text>
      </Card.Content>
    </Card>
  );
}
