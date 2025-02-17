import React, { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import globalStyles from '../styles/globalStyles';
import { initializeFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../auth/firebase';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { format } from 'date-fns';
import DatePicker from 'react-native-date-picker';


const db = initializeFirestore(app, { experimentalForceLongPolling: true });
const searchCollection = collection(db, 'pesquisas');


export default function NovaPesquisa(props) {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [nomePesquisa, setNomePesquisa] = useState('');
  const [errorNome, setErrorNome] = useState('');
  const [errorData, setErrorData] = useState('');
  const [sucessoMessage, setSucessoMessage] = useState('');
  const [image, setImage] = useState(null);

  const handleCadastroPesquisa = (nome, data) => {
    setErrorNome('');
    setErrorData('');
    setSucessoMessage('');
  
    if (nome !== '' && data !== '') {
      // Enviar dados para o Firestore
      addDoc(searchCollection, {
        title: nome,
        date: data,
        image: image, // A imagem (URI) que você selecionou ou capturou
      })
        .then(() => {
          setSucessoMessage('Pesquisa cadastrada com sucesso');
          setNomePesquisa('');
          setDate(new Date());
          setImage(null);
        })
        .catch((error) => {
        
          setSucessoMessage('Erro ao cadastrar pesquisa');
        });
    } else {
      if (nome === '') {
        setErrorNome('Preencha o nome da pesquisa');
      }
      if (data === '') {
        setErrorData('Preencha a data');
      }
    }
  };

  const handleImagePicker = () => {
    Alert.alert(
      'Selecione',
      'Informe de onde você quer pegar a foto',
      [
        {
          text: 'Galeria',
          onPress: () => pickImageFromGallery(),
          style: 'default',
        },
        {
          text: 'Câmera',
          onPress: () => pickImageFromCamera(),
          style: 'default',
        },
      ],
      { cancelable: true },
    );
  };

  const pickImageFromGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1, 
    });

    if (result?.assets?.length > 0) {
      const asset = result.assets[0];
      setImage(asset.uri); 
    } else {
      console.log("Nenhuma imagem foi selecionada.");
    }
  };

  const pickImageFromCamera = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      quality: 1,  
      saveToPhotos: true,  
    });

    if (result?.assets?.length > 0) {
      const asset = result.assets[0];
      setImage(asset.uri); 
    } else {
      console.log("Nenhuma foto foi tirada.");
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <TouchableOpacity onPress={() => props.navigation.pop()}>
          <Icon name="arrow-back" size={30} style={globalStyles.headerImg} />
        </TouchableOpacity>
        <Text style={globalStyles.header}>Nova pesquisa</Text>
      </View>

      <View style={globalStyles.area}>
        <Text style={globalStyles.label}>Nome</Text>
        <TextInput
          style={globalStyles.inputs}
          placeholder="Preencha o nome da pesquisa"
          value={nomePesquisa}
          onChangeText={setNomePesquisa}
        />
        {errorNome ? (
          <Text style={globalStyles.errorText}>{errorNome}</Text>
        ) : null}

        <Text style={globalStyles.label}>Data</Text>
        <TextInput
          style={globalStyles.inputs}
          value={format(date, 'dd/MM/yyyy')}
          inlineImageLeft="calendar-month"
          right={
            <TextInput.Icon
              icon="calendar-month"
              size={30}
              color={'#00000077'}
              onPress={() => setOpen(true)}
            />
          }
          editable={false}
        />
        <DatePicker
          title={'Selecione a data'}
          modal
          locale="pt"
          mode="date"
          open={open}
          date={date}
          onConfirm={(date) => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />

        {errorData ? (
          <Text style={globalStyles.errorText}>{errorData}</Text>
        ) : null}
      </View>

      <View style={globalStyles.area}>
        <Text style={globalStyles.label}>Imagem</Text>
        <TouchableOpacity style={globalStyles.image} onPress={handleImagePicker}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ height: 200, width: 200 }}
            />
          ) : (
            <Text style={globalStyles.label2}>Câmera/Galeria de imagens</Text>
          )}
        </TouchableOpacity>

        {sucessoMessage ? (
          <Text style={globalStyles.sucessoMessage}>{sucessoMessage}</Text>
        ) : null}
      </View>

      <View style={globalStyles.areaButtons}>
        <TouchableOpacity
          style={globalStyles.buttonVerde}
          onPress={() =>
            handleCadastroPesquisa(nomePesquisa, format(date, 'dd/MM/yyyy'))
          }
        >
          <Text style={globalStyles.buttonText}>CADASTRAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
