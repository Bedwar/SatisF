import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import CardPesquisa from '../componentes/CardPesquisa';
import { TextInput } from 'react-native-paper';
import globalStyles from '../styles/globalStyles';
import { useEffect, useState } from 'react';
import { initializeFirestore, collection, query, onSnapshot } from 'firebase/firestore';
import { app } from '../auth/firebase';
import { useSelector } from 'react-redux';

const Home = (props) => {

  const researchData2 = [
    { title: 'SECOMP 2023', date: '10/10/2023', image: require('../../assets/images/secomp-icon.png') },
    { title: 'UBUNTU 2022', date: '05/06/2022', image: require('../../assets/images/ubuntu-icon.png') },
    { title: 'MENINAS CPU', date: '01/04/2022', image: require('../../assets/images/meninas-icon.png') }
];
  const db = initializeFirestore(app, {experimentalForceLongPolling: true});
  const searchCollection = collection(db, 'pesquisas');
  const [researchData, setResearchData] = useState([]);

  const email = useSelector(state => state.email);

  useEffect(() => {
    const q = query(searchCollection);
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const items = [];
      querySnapshot.forEach(doc => {
        items.push({ id: doc.id, ...doc.data() });
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
        {researchData2.map((research, index) => {
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
