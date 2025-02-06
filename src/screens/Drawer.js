import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import globalStyles from '../styles/globalStyles';
import Home from '../screens/Home';


const DrawerNavigator = createDrawerNavigator();

const Drawer = (props) => {

  const email = props.route.params.email;

  return (
    <DrawerNavigator.Navigator
      screenOptions={{
        drawerActiveTintColor: 'darkslateblue',
        headerTintColor: '#fff',
        headerTitle: '',
        drawerLabelStyle: {
          fontSize: 80,
          color: 'white',
          fontFamily: 'AveriaLibre-Regular',
        },
        drawerStyle: {
          backgroundColor: 'darkslateblue',
          width: '70%',
          fontFamily: 'AveriaLibre-Regular',
        },
        headerBackground: () => (
          <View
            style={{
              alignItems: 'center',
              marginBottom: 5,
              backgroundColor: '#2B1D62',
              height: 75,
              paddingHorizontal: 40,
            }}
          />
        ),
      }}
      drawerContent={props => (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{flex: 1, padding: 20, width: '100%'}}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>{'usuario@dominio.com'}</Text>

            <View style={{ height: 1, backgroundColor: "white", marginBottom: 20 }} />


            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 20,
              }}
              onPress={() => props.navigation.goBack()}>
                <Icon
                  name="description"
                  color={'white'}
                  size={20}
                />              
                <Text style={{color: 'white', fontSize: 16, marginLeft: 10}}>
                Pesquisas
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 'auto',
              }}
              onPress={() => alert('Sair')}>
              <Icon name="login" size={20} color="white" />
              <Text style={{color: 'white', fontSize: 16, marginLeft: 10}}>
                Sair
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}>
      <DrawerNavigator.Screen name="Pesquisas" component={Home} />
    </DrawerNavigator.Navigator>
  );
};

export default Drawer;
