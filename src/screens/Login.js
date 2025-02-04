import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import globalStyles from '../styles/globalStyles';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validarEmail = (email) => {
    return /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);
  };

  const handleError = () => {
    setErrorMessage('E-mail e/ou senha inválidos.');
  };

  const showNovaConta = () => {
    props.navigation.navigate('NovaConta');
  };

  const showRecuperarSenha = () => {
    props.navigation.navigate('RecuperarSenha');
  };

  const showHome = (email, password) => {
    if (validarEmail(email) && password !== '') {
      setErrorMessage('');
      props.navigation.navigate('Drawer', { email: email });
    } else {
     handleError();
    }
  };

  return (
    <ScrollView contentContainerStyle={globalStyles.containerLogin}>
      
      
       
      <View style={globalStyles.headerLogin }>
        <Text style={globalStyles.headerLogin}> Satisfying.you </Text>
        <Icon name="mood" size={45} style={{color: 'white'}} />
      </View>


      <View style={globalStyles.area}>
        <Text style={globalStyles.label}>E-mail</Text>
        <TextInput
          style={globalStyles.inputs}
          placeholder="usuario@dominio.com"
          value={email}
          onChangeText={(text) => setEmail(text)}


        />
   
        <Text style={globalStyles.label}>Senha</Text>
        <TextInput
          style={globalStyles.inputs}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}

        />
        {errorMessage ? <Text style={globalStyles.errorText}>{errorMessage}</Text> : null}
      
        <TouchableOpacity style={globalStyles.buttonVerde} onPress={() => showHome(email, password)}>
          <Text style={globalStyles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        
        </View>


      
        <View style={globalStyles.areaButtons}>
          <TouchableOpacity style={globalStyles.buttonAzul} onPress={showNovaConta}>
            <Text style={globalStyles.buttonText}>Criar nova conta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={globalStyles.buttonCinza} onPress={showRecuperarSenha}>
            <Text style={globalStyles.buttonText}>Esqueci a senha</Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
  );
};



export default Login;
