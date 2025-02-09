import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import globalStyles from '../styles/globalStyles';
import { format } from 'date-fns';
import DatePicker from 'react-native-date-picker';
import { Modal } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { initializeFirestore, collection, updateDoc, doc } from 'firebase/firestore';
import { app } from '../auth/firebase';


const parseDate = (dateString) => {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day);
};

const ModificarPesquisa = (props) => {
  const research = props.route.params.research;
  const [date, setDate] = useState(
    research.date ? parseDate(research.date) : null,
  );
  const [open, setOpen] = useState(false);
  const [nomePesquisa, setNomePesquisa] = useState(research.title || '');
  const [errorNome, setErrorNome] = useState('');
  const [errorData, setErrorData] = useState('');
  const [sucessoMessage, setSucessoMessage] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(research.image || null);

  const db = initializeFirestore(app, {experimentalForceLongPolling: true});
  

  const handleModificarPesquisa = (nome, data) => {
    setErrorNome('');
    setErrorData('');
    setSucessoMessage('');
    if (nome !== '' && data !== '') {
      setSucessoMessage('Nova pesquisa registrada!');
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

  const pickImageFromCamera = async () => {
    const result = await launchCamera((options = {mediaType: 'photo'}));
    const assets = result?.assets[0];
    setImage(assets?.uri);
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <TouchableOpacity onPress={() => props.navigation.pop()}>
          <Icon
            name="arrow-back"
            size={30}
            style={globalStyles.headerImg}
          />
        </TouchableOpacity>
        <Text style={globalStyles.title}>Modificar pesquisa</Text>
      </View>

      <View style={globalStyles.content}>
        <View style={globalStyles.inputWrapper}>
          <Text style={globalStyles.label}>Nome</Text>
          <TextInput
            // style={globalStyles.input}
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
              <Image source={image} style={globalStyles.pickedImage} />
            ) : (
              <Text style={globalStyles.imageButtonText}>
                Câmera/Galeria de imagens
              </Text>
            )}
          </TouchableOpacity>

          {sucessoMessage ? (
            <Text style={globalStyles.sucessoMessage}>{sucessoMessage}</Text>
          ) : null}
        </View>
      </View>

      <View style={[globalStyles.btnContainer]}>
        
            <TouchableOpacity style={globalStyles.button} onPress={() =>
              handleModificarPesquisa(nomePesquisa, format(date, 'dd/MM/yyyy'))
            }>
        <Text style={globalStyles.buttonText}>SALVAR</Text>
      </TouchableOpacity>
        <Icon name="delete" size={40} color="white" />
            <Text
              style={{
                color: 'white',
                fontFamily: 'AveriaLibre-Regular',
                fontSize: 20,
              }}>
              Apagar
            </Text>

            
        <View style={[globalStyles.button2]}>
          <TouchableOpacity
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
            onPress={() => setModalVisible(true)}>
            <Icon name="delete" size={40} color="white" />
            
          </TouchableOpacity>
          
        </View>
      </View>

      <Modal isVisible={isModalVisible} style={globalStyles.modalContent}>
        <View style={globalStyles.modalView}>
          <Text style={globalStyles.modalText}>
            Tem certeza de apagar essa pesquisa?
          </Text>
          <View style={globalStyles.modalContainer}>
            <TouchableOpacity
              style={[globalStyles.modalButton, {backgroundColor: '#FF8383'}]}
              onPress={() => setModalVisible(false)}>
              <Text style={globalStyles.modalButtonText}>SIM</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                globalStyles.modalButton,{backgroundColor: '#3F92C5'},
              ]}
              onPress={() => setModalVisible(false)}>
              <Text style={globalStyles.modalButtonText}>CANCELAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModificarPesquisa;
