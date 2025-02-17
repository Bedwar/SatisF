import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import globalStyles from '../styles/globalStyles';
import { format } from 'date-fns';
import DatePicker from 'react-native-date-picker';
import { Modal } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { initializeFirestore, doc, updateDoc, deleteDoc } from 'firebase/firestore';
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

  const db = initializeFirestore(app, { experimentalForceLongPolling: true });

  const handleModificarPesquisa = (nome, data) => {
    setErrorNome('');
    setErrorData('');
    setSucessoMessage('');
  
    // Verificando se o nome e a data são válidos
    if (nome !== '' && data !== '') {
      const searchRef = doc(db, 'pesquisas', research.id);
      
      // Garantir que image seja uma string ou null antes de enviar para o Firestore
      const imageValue = image ? String(image) : null;
  
      updateDoc(searchRef, {
        title: nome,
        date: data,
        image: imageValue, 
      })
        .then(() => {
          setSucessoMessage('Pesquisa modificada com sucesso');
        })
        .catch((error) => {
          console.error('Error updating document: ', error);
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

  const handleSearchDelete = () => {
    const searchRef = doc(db, 'pesquisas', research.id);
    deleteDoc(searchRef)
      .then(() => {
        console.log('Document successfully deleted!');
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });

    setModalVisible(false);
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
          text: 'Camera',
          onPress: () => pickImageFromCamera(),
          style: 'default',
        },
      ],
      { cancelable: true },
    );
  };

  const pickImageFromGallery = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    const asset = result?.assets[0];
    if (asset && asset.uri) {
      setImage(String(asset.uri)); // Garantindo que a URI seja uma string válida
    } else {
      setImage(null); // Se não houver URI válida, defina como null
    }
  };

  const pickImageFromCamera = async () => {
    const result = await launchCamera({ mediaType: 'photo' });
    const asset = result?.assets[0];
    if (asset && asset.uri) {
      setImage(String(asset.uri)); // Garantindo que a URI seja uma string válida
    } else {
      setImage(null); // Se não houver URI válida, defina como null
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <TouchableOpacity onPress={() => props.navigation.pop()}>
          <Icon name="arrow-back" size={30} style={globalStyles.headerImg} />
        </TouchableOpacity>
        <Text style={globalStyles.header}>Modificar pesquisa</Text>
      </View>

      <View style={globalStyles.area}>
        <Text style={globalStyles.label}>Nome</Text>
        <TextInput
          style={globalStyles.inputs}
          placeholder="Preencha o nome da pesquisa"
          value={nomePesquisa}
          onChangeText={setNomePesquisa}
        />
        {errorNome ? <Text style={globalStyles.errorText}>{errorNome}</Text> : null}

        <Text style={globalStyles.label}>Data</Text>
        <TextInput
          style={globalStyles.inputs}
          value={date ? format(date, 'dd/MM/yyyy') : ''}
          right={
            <TextInput.Icon
              icon="calendar-month"
              size={30}
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
          onConfirm={(date) => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => setOpen(false)}
        />
        {errorData ? <Text style={globalStyles.errorText}>{errorData}</Text> : null}
      </View>

      <View style={globalStyles.area}>
        <Text style={globalStyles.label}>Imagem</Text>
        <TouchableOpacity style={globalStyles.image} onPress={handleImagePicker}>
          <Text style={[globalStyles.label2, { color: 'grey' }]}>
            Câmera/Galeria de imagens
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[globalStyles.areaButtons]}>
        <TouchableOpacity
          style={globalStyles.buttonVerde}
          onPress={() =>
            handleModificarPesquisa(nomePesquisa, format(date, 'dd/MM/yyyy'))
          }
        >
          <Text style={globalStyles.buttonText}>SALVAR</Text>
        </TouchableOpacity>

        <View style={[globalStyles.button2]}>
          <TouchableOpacity
            style={{
              display: 'row',
              alignItems: 'center',
            }}
            onPress={() => setModalVisible(true)}
          >
            <Icon name="delete" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={isModalVisible} style={globalStyles.modal}>
        <View style={globalStyles.areaModal}>
          <Text style={globalStyles.inputsModal}>Tem certeza de apagar essa pesquisa?</Text>
          <View style={globalStyles.areaButtonsModal}>
            <TouchableOpacity
              style={[globalStyles.buttonVerde]}
              onPress={() => handleSearchDelete()}
            >
              <Text style={globalStyles.buttonTextModal}>SIM</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[globalStyles.buttonVermelho]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={globalStyles.buttonTextModal}>CANCELAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModificarPesquisa;
