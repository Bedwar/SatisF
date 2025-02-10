
import { format } from 'date-fns';
import React, { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import globalStyles from '../styles/globalStyles';
import { initializeFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../auth/firebase';


export default function NovaPesquisa(props) {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [nomePesquisa, setNomePesquisa] = useState('');
  const [errorNome, setErrorNome] = useState('');
  const [errorData, setErrorData] = useState('');
  const [sucessoMessage, setSucessoMessage] = useState('');
  const [image, setImage] = useState(null);

  const db = initializeFirestore(app, {experimentalForceLongPolling: true});
  const searchCollection = collection(db, 'pesquisas');

  const handleCadastroPesquisa = (nome, data) => {
    setErrorNome('');
    setErrorData('');
    setSucessoMessage('');
    if (nome !== '' && data !== '') {
      addDoc(searchCollection, {
        title: nome,
        date: data,
        image: image,
      })
        .then(() => {
          setSucessoMessage('Pesquisa cadastrada com sucesso');
          setNomePesquisa('');
          setDate(new Date());
          setImage(null);
        })
        .catch(error => {
          console.error('Error adding document: ', error);
        });
    } else {
      if (nome == '') {
        setErrorNome('Preencha o nome da pesquisa');
      }
      if (data == '') {
        setErrorData('Preencha a data');
      }
    }
  };

 const handleImagePicker = () => {
    Alert.alert(
      'Selecione',
      'Informe de onde voce quer pegar a foto',
      [
        {
          text: 'Galeria',
          onPress: () => pickImageFromGalery(),
          style: 'default',
        },
        {
          text: 'Camera',
          onPress: () => pickImageFromCamera(),
          style: 'default',
        },
      ],
      {
        cancelable: true,
      },
    );
  }; 

   const pickImageFromGalery = async () => {
    const result = await launchImageLibrary((options = {mediaType: 'photo'}));
    const assets = result?.assets[0];
    setImage(assets?.uri);
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
        <View style={globalStyles.inputWrapper}>
          <Text style={globalStyles.label}>Nome</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Preencha o nome da pesquisa"
            value={nomePesquisa}
            onChangeText={setNomePesquisa}
          />
          {errorNome ? (
            <Text style={globalStyles.errorText}>{errorNome}</Text>
          ) : null}
        </View>

        <View style={globalStyles.inputWrapper}>
          <Text style={globalStyles.label}>Data</Text>
          <TextInput
            value={format(date, 'dd/MM/yyyy')}
            inlineImageLeft="calendar-month"
            right={
              <TextInput.Icon
                icon="calendar-month"
                size={35}
                color={'#00000077'}
                style={globalStyles.dateIcon}
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
            onConfirm={date => {
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

        <View style={globalStyles.inputWrapper}>
          <Text style={globalStyles.label}>Imagem</Text>
          <TouchableOpacity
            style={globalStyles.imageTouchable}
            onPress={handleImagePicker}>
            {image ? (
              <Image
                source={{uri: image}}
                style={globalStyles.pickedImage}
              />
            ) : (
              <Text style={globalStyles.label}>
                Câmera/Galeria de imagens
              </Text>
            )}
          </TouchableOpacity>

          {sucessoMessage ? (
            <Text style={globalStyles.sucessoMessage}>{sucessoMessage}</Text>
          ) : null}
        </View>
      </View>

      <View style={globalStyles.areaButtons}>
        <TouchableOpacity
          style={globalStyles.buttonVerde}
          onPress={() =>
            handleCadastroPesquisa(nomePesquisa, format(date, 'dd/MM/yyyy'))
          }>
          <Text style={globalStyles.buttonText}>CADASTRAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}