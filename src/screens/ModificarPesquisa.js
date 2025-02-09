import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import globalStyles from '../styles/globalStyles';


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
    <View style={changeSearchStyles.container}>
      <View style={changeSearchStyles.header}>
        <TouchableOpacity onPress={() => props.navigation.pop()}>
          <Icon
            name="arrow-back"
            size={30}
            style={changeSearchStyles.headerImg}
          />
        </TouchableOpacity>
        <Text style={changeSearchStyles.title}>Modificar pesquisa</Text>
      </View>

      <View style={changeSearchStyles.content}>
        <View style={changeSearchStyles.inputWrapper}>
          <Text style={changeSearchStyles.label}>Nome</Text>
          <TextInput
            // style={changeSearchStyles.input}
            placeholder="Preencha o nome da pesquisa"
            value={nomePesquisa}
            onChangeText={setNomePesquisa}
          />
          {errorNome ? (
            <Text style={globalStyles.errorText}>{errorNome}</Text>
          ) : null}
        </View>

        <View style={changeSearchStyles.inputWrapper}>
          <Text style={changeSearchStyles.label}>Data</Text>
          <TextInput
            value={format(date, 'dd/MM/yyyy')}
            right={
              <TextInput.Icon
                icon="calendar-month"
                size={35}
                color={'#00000077'}
                style={changeSearchStyles.dateIcon}
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

        <View style={changeSearchStyles.inputWrapper}>
          <Text style={changeSearchStyles.label}>Imagem</Text>
          <TouchableOpacity
            style={changeSearchStyles.imageTouchable}
            onPress={handleImagePicker}>
            {image ? (
              <Image source={image} style={changeSearchStyles.pickedImage} />
            ) : (
              <Text style={changeSearchStyles.imageButtonText}>
                Câmera/Galeria de imagens
              </Text>
            )}
          </TouchableOpacity>

          {sucessoMessage ? (
            <Text style={globalStyles.sucessoMessage}>{sucessoMessage}</Text>
          ) : null}
        </View>
      </View>

      <View style={[changeSearchStyles.btnContainer]}>
        
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

            
        <View style={[changeSearchStyles.button2]}>
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

      <Modal isVisible={isModalVisible} style={changeSearchStyles.modalContent}>
        <View style={changeSearchStyles.modalView}>
          <Text style={changeSearchStyles.modalText}>
            Tem certeza de apagar essa pesquisa?
          </Text>
          <View style={changeSearchStyles.modalContainer}>
            <TouchableOpacity
              style={[changeSearchStyles.modalButton, {backgroundColor: '#FF8383'}]}
              onPress={() => setModalVisible(false)}>
              <Text style={changeSearchStyles.modalButtonText}>SIM</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                changeSearchStyles.modalButton,{backgroundColor: '#3F92C5'},
              ]}
              onPress={() => setModalVisible(false)}>
              <Text style={changeSearchStyles.modalButtonText}>CANCELAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModificarPesquisa;
