import React from 'react';
import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import CardPesquisa from '../componentes/CardPesquisa';
import globalStyles from '../styles/globalStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useEffect, useState } from 'react';
import { initializeFirestore, collection, query, onSnapshot } from 'firebase/firestore';
import { app } from '../auth/firebase';


const Home = (props) => {

  const db = initializeFirestore(app, {experimentalForceLongPolling: true});
  const searchCollection = collection(db, 'pesquisas');
  const [researchData, setResearchData] = useState([]);

  useEffect(() => {
    const q = query(searchCollection);
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const items = [];
      querySnapshot.forEach(doc => {
        items.push(doc.data());
      });
      setResearchData(items);
    });
    return () => {
      unsubscribe();
    };
  }, []);


  const showNovaPesquisa = () => {
    props.navigation.navigate('NovaPesquisa');
  }; 

  const showAcoesPesquisa = research => {
    props.navigation.navigate('AcoesPesquisa', {research: research});
  };

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
