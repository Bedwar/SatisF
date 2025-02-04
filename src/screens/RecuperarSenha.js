import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import globalStyles from '../styles/globalStyles';


const RecuperarSenha = (props) => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [sucessoMessage, setSucessoMessage] = useState('');

  //valida email
  const validarEmail = (email) => {
    return /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email)
  };

  const handleRecoverPassword = (text) => {
    setSucessoMessage('');setErrorMessage('');
    if(validarEmail(text)) {
      setSucessoMessage('Email enviado com sucesso!')
    } else {
      setErrorMessage('E-mail parece ser inválido');
    }
  };

  return (
    <View style={globalStyles.container}>

      <View style={globalStyles.header}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
          <Icon name="arrow-back" size={35} style={globalStyles.headerImg} />
        </TouchableOpacity>
        <Text style={globalStyles.header}>Recuperação de senha</Text>
      </View>

      <View style={globalStyles.area}>
        <Text style={globalStyles.label}>E-mail</Text>
        <TextInput
          style={globalStyles.inputs}
          placeholder="usuario@dominio.com"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        {errorMessage ? <Text style={globalStyles.errorText}>{errorMessage}</Text> : null}
        {sucessoMessage ? <Text style={globalStyles.sucessoMessage}>{sucessoMessage}</Text> : null}
       
      </View >
      <View style={globalStyles.areaButtons}>
      <TouchableOpacity
          style={globalStyles.buttonVerde}
          onPress={() => handleRecoverPassword(email)}
        >
          <Text style={globalStyles.buttonText}>RECUPERAR</Text>
        </TouchableOpacity>
  </View>
    </View>
  );
};



export default RecuperarSenha
