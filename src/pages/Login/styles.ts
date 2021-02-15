import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  logo:{
    width: '80%',
    marginTop: Dimensions.get('window').height / 3
  },

  logoText:{
    fontSize: 24,
    color: '#532F0D',
    fontFamily: 'Oswald_400Regular'
  },

  button:{
    width: '80%',
    height: 53,
    borderRadius:6,
    backgroundColor: '#1B7693',
    elevation: 6,

    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonText:{
    color: '#0A2940',
    fontSize: 36,
    fontFamily: 'Staatliches_400Regular'
  },

})

export default styles;