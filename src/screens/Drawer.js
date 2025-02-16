import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import globalStyles from '../styles/globalStyles';
import Home from '../screens/Home';
import { useSelector } from 'react-redux';


const DrawerNavigator = createDrawerNavigator();

const Drawer = (props) => {

  const email = useSelector(state => state.email.email);

  return (
    <DrawerNavigator.Navigator
      screenOptions={{
        drawerActiveTintColor: 'darkslateblue',
        headerTintColor: '#fff',
        headerTitle: '',
        drawerLabelStyle: {
          fontFamily: 'AveriaLibre-Regular',
        },
        drawerStyle: {
          backgroundColor: '#2B1D62',
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
          <View >
            <Text style={globalStyles.label}>{email}</Text>
          </View>

          

          <View >
         
            <DrawerItem
              icon={({focused, color, size}) => (
                <Icon
                  name="description"
                  size={35}
                  color={focused ? '#7cc' : '#ccc'}
                />
              )}
              labelStyle={globalStyles.labelDrawer}
              label="Pesquisas"
              onPress={() => {
                props.navigation.goBack();
              }}
            />

            <DrawerItem
              style={globalStyles.sair}
              icon={({focused, size}) => (
                <Icon
                  name="login"
                  size={35}
                  color={focused ? '#7cc' : '#ccc'}
                />
              )}
              labelStyle={globalStyles.labelDrawer}
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
