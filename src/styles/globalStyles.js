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
    areaButtonsModal: {
      flexDirection:'row',
      justifyContent:'center'
     // backgroundColor:'yellow',
    
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
 
  content2:{
    
    flexDirection:'row',

  },
content:{
  height:120,
  width:130,
    borderRadius: 5,
    justifyContent:'center',
    alignItems:'center',
    padding:15,
    margin:4,
    backgroundColor: colors.darkerBackground,

  },
  contentColeta:{
  marginTop:100,  
  alignItems:'center',

      margin:4,
  
    },

  headerLogin: {
    //backgroundColor:'grey',
    flexDirection: 'row',
    fontSize: 34,
    
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

  labelDrawer:{
    
    marginTop: 10,
    marginLeft:5,
    fontSize: 22,
    color: colors.text,
    fontFamily: fonts.regular,
  },
  sair: {

    marginTop:650,
    fontSize: 18,
    color: colors.text,
    fontFamily: fonts.regular,
  },
  label2: {
   
    padding:20,
   // backgroundColor:'green',
    fontSize: 16,
    color: 'grey',
    fontFamily: fonts.regular,
  },
  modal:{
    background: 'white',
    padding: 10,
    marginLeft:40,
   
    width: '80%',
  },

  
  inputs: {
 
    color: colors.azul,
    backgroundColor: colors.text,
    fontFamily: fonts.regular,
    borderRadius: 1,
    height: 35,
   // backgroundColor:'green',
    padding: 15,
    paddingVertical: 0,
  },
  inputsModal: {
    
    fontSize: 20,
    fontFamily: fonts.regular,
 
 

  },
  areaModal: {
    backgroundColor:'white',
    borderRadius:10,
    width: '100%',
    padding: spacing.large,
   },
  image: {
    color:'grey',
    backgroundColor: colors.text,
    fontFamily: fonts.regular,
    borderRadius: 1,
    height: 65,
    width:'80%',

  },

  buttonVerde: {
  
    backgroundColor: colors.verde,
    borderRadius: 1,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 55,
  },
  buttonVermelho: {
  
    backgroundColor: 'tomato',
    borderRadius: 1,
    height: 35,
    justifyContent: 'center',
    marginLeft: 10,
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

  
  buttonTextModal: {
    color: colors.text,
    fontSize: 15,
    width:100,
    marginLeft:10,
    fontFamily: fonts.regular,
  },
  AcoesText: {
    color: colors.text,
    fontSize: 16,
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
