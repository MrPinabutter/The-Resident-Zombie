import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#E0DB64', 
    alignItems: 'center'
  },

  descriptionContainer: {
    width: '80%', 
    marginTop: 60, 
    marginBottom: 50
  },

  description1: {
    fontFamily: 'Staatliches_400Regular', 
    fontSize: 36, 
    color: '#25005E'
  },

  description2: {
    fontFamily: 'Montserrat_400Regular', 
    fontSize: 24, 
    color: '#6518D8'
  },

  pickerContainer: {
    borderRadius: 6, 
    backgroundColor: '#CFC557', 
    height: 40, 
    justifyContent: 'center', 
    alignItems: 'center', 
    overflow: 'hidden', 
    marginTop: 5
  },

  picker: {
    width: '100%', 
    height: 40, 
    backgroundColor: '#CFC557', 
    borderRadius: 6, 
    marginTop: 5, 
    padding: 10
  },

  amountContainer: {
    marginTop: 15, 
    width: '80%', 
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },

  label: {
    fontFamily: 'Montserrat_700Bold', 
    fontSize: 18, 
    color: '#27251C'
  },

  amoutInput: {
    width: '100%', 
    height: 40, 
    backgroundColor: '#CFC557', 
    borderRadius: 6, 
    marginTop: 5, 
    padding: 10
  },

  addButton: {
    width: '100%', 
    height: 40, 
    backgroundColor: '#DF7412', 
    elevation: 3, 
    borderRadius: 6, 
    marginTop: 5, 
    justifyContent: 'center', 
    alignItems: 'center'
  },

  button:{
    width: '80%',
    height: 53,
    borderRadius:6,
    backgroundColor: '#B6303D',
    elevation: 6,

    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60
  },

  buttonText:{
    color: '#fff',
    fontSize: 36,
    fontFamily: 'Staatliches_400Regular'
  },

  textInput: {
    fontFamily: 'Oswald_400Regular',
    color: '#000',
    fontSize: 14
  }
})

export default styles;