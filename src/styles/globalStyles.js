import {StyleSheet} from 'react-native';
import { shadow } from 'react-native-paper';
import {grey100} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

export const colors = {
  erro: 'tomato',
  background: 'darkslateblue',
  text: '#FFFFFF',
  azul: '#4dc6e8',
  verde: '#5cdb95',
  darkerBackground: '#2B1D62',
  btnGreen: '#37BD6D',
  placeholder: '#939393',
  goBackBlue: '#573FBA',
};

export const spacing = {
  small: 8,
  medium: 16,
  large: 24,
  extraLarge: 50,
};

export const fonts = {
  regular: 'AveriaLibre-Regular',
  bold: 'AveriaLibre-Bold',
  italic: 'AveriaLibre-Italic',
};

const globalStyles = StyleSheet.create({
 

  container: {
    flex: 1,
    flexGrow: 1,
    justifyContent:'space-between',
    alignItems: 'center',
   // backgroundColor:'green',
    backgroundColor: colors.background,
  },
  crudContainer: {
    flex: 1,
    justifyContent: 'flex-start', // Ensures components stack from the top
    alignItems: 'stretch',       // Allows children to take full width
    backgroundColor: colors.background,
  },
  containerLogin: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
   // backgroundColor:'green',
    backgroundColor: colors.background,
  },
  area: {
    flex: 0.4,
    //backgroundColor:'red',
    width: '100%',
    padding: spacing.extraLarge,
   },
   areaButtons: {
     flex: 0.2,
    // backgroundColor:'yellow',
     width: '100%',
     padding: spacing.extraLarge,
    },
 
  header: {
    display: 'flex',
    fontSize: 34,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    fontFamily: fonts.regular,
    color: colors.text,
    backgroundColor: colors.darkerBackground,
    width: '100%',
    paddingVertical: 12,
  },
  

  headerLogin: {
    //backgroundColor:'grey',
    flexDirection: 'row',
    fontSize: 34,
    justifyContent:'flex-start',
    alignItems:'flex-start',
    fontFamily: fonts.regular,
    color: colors.text,
  },

  headerImg: {
    alignItems:'center',
    marginLeft:8,
    color: colors.background,
  },

  label: {
    marginTop:15,
    fontSize: 18,
    color: colors.text,
    fontFamily: fonts.regular,
  },

  inputs: {
    borderBottomColor: 'black',
    color: colors.azul,
    backgroundColor: colors.text,
    fontFamily: fonts.regular,
    borderRadius: 1,
    height: 35,
   // backgroundColor:'green',
    padding: 15,
    paddingVertical: 0,
  },


  buttonVerde: {
  
    backgroundColor: colors.verde,
    borderRadius: 1,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 55,
  },
  buttonAzul: {
    backgroundColor: colors.azul,
    borderRadius: 1,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonCinza: {
    backgroundColor: '#B0CCDE',
    borderRadius: 1,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: colors.text,
    fontSize: 20,
    fontFamily: fonts.regular,
  },

  errorText: {
    fontSize: 14,
    color: colors.erro,
    fontFamily: fonts.regular,
  },
  sucessoMessage: {
    fontSize: 14,
    color: colors.text,
    fontFamily: fonts.regular,

  },

  researchCard: {
    marginLeft:20,
   // backgroundColor:'red',
    borderRadius: 10,
  },

  imageContainer: {
    fontFamily: fonts.bold,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardImage: {
    width: 100,
    height: 90,
    marginTop: 20,
  },

  title: {
    fontSize: 16,
    lineHeight: 36,
    fontFamily: fonts.regular,
    fontSize: 36,
    marginTop: 15,
    color: colors.text,
  },

  date: {
    textAlign: 'center',
  },


 // searchBar: {
   
    //backgroundColor: colors.text,
   // width: '100%',
    //display: 'flex',
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
 // },


});

export default globalStyles;
