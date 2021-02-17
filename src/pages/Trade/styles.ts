import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#7D8C65'
  },

  header: {
    width: '100%', 
    height: 70, 
    backgroundColor: '#30402C', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between'
  },

  labelContainer: {
    backgroundColor: '#571331', 
    width: '90%', 
    height: 60, 
    borderTopLeftRadius: 123, 
    borderBottomLeftRadius: 123, 
    marginTop: -30, 
    marginBottom: 20, 
    alignSelf: 'flex-end', 
    justifyContent: 'center'
  },

  label: {
    fontFamily: 'Staatliches_400Regular', 
    fontSize: 36, 
    color: '#fff', 
    paddingLeft: 25
  },

  footer: {
    width: '100%', 
    height: 120, 
    backgroundColor: '#84658C', 
    justifyContent: 'center', 
    alignItems: 'center'
  },

  footerText: {
    fontFamily: 'Staatliches_400Regular',
    fontSize: 24, 
    color: '#fff'
  }
})

export default styles;