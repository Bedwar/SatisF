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
        <DrawerContentScrollView {...props}>
          <View style={globalStyles.emailContainer}>
            <Text style={globalStyles.emailText}>{'usuario@dominio.com'}</Text>
          </View>

          <View style={globalStyles.separator}></View>

          <View style={globalStyles.drawerContainer}>
            <DrawerItem
              icon={({focused, color, size}) => (
                <Icon
                  name="description"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              )}
              labelStyle={globalStyles.label}
              label="Pesquisas"
              onPress={() => {
                props.navigation.goBack();
              }}
              style={{}}
            />

            <DrawerItem
              style={{marginBottom: 50}}
              icon={({focused, color, size}) => (
                <Icon
                  name="login"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              )}
              labelStyle={globalStyles.label}
              label="Sair"
              onPress={() => {
                props.navigation.popToTop();
              }}
            />
          </View>
        </DrawerContentScrollView>
      )}>
      <DrawerNavigator.Screen name="Pesquisas" component={Home} />
    </DrawerNavigator.Navigator>
  );
};

export default Drawer;
