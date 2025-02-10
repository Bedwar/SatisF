import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import globalStyles from '../styles/globalStyles';
import auth_mod from '../auth/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setEmail as reduceSetEmail } from '../redux/emailSlice';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();

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
    signInWithEmailAndPassword(auth_mod, email, password).then(user => {
      props.navigation.navigate('Drawer', { email: email });
      dispatch(reduceSetEmail(email));
    }).catch(error => {
      handleError();
    });
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
