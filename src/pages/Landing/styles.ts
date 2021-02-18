import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#7D8C65', 
    alignItems: 'center'
  },

  header: {
    width: '100%', 
    height: 170, 
    backgroundColor: '#30402C', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between'
  },

  gasMaskIcon: {
    width: 80, 
    height: 80, 
    marginHorizontal: 10
  },

  statusText: {
    fontFamily: 'Staatliches_400Regular', 
    fontSize: 24, 
    color: '#fff'
  },

  nameText: {
    fontFamily: 'Oswald_400Regular', 
    fontSize: 18, 
    color: '#C59D51'
  },

  idText: {
    fontFamily: 'Montserrat_400Regular', 
    fontSize: 10, 
    color: '#9A7F4C'
  },

  inventory: {
    width: 55, 
    height: 55, 
    borderRadius: 30, 
    backgroundColor: '#698C61', 
    elevation: 3, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginHorizontal:12
  },

  labelContainer: {
    backgroundColor: '#571331', 
    width: '90%', 
    height: 60, 
    borderTopLeftRadius: 123, 
    borderBottomLeftRadius: 123, 
    marginTop: -30, 
    marginBottom: 40, 
    alignSelf: 'flex-end', 
    justifyContent: 'center'
  },

  label: {
    fontFamily: 'Staatliches_400Regular', 
    fontSize: 36, 
    color: '#fff', 
    paddingLeft: 25
  },

  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1D368',
    borderRadius: 6
  },

  buttonModal: {
    width: '80%', 
    height: 50, 
    backgroundColor: '#3C5083', 
    elevation: 3,
    borderRadius: 6, 
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },

  textModal: {
    color: '#25005E', 
    fontSize: 24, 
    paddingLeft: 0, 
    marginBottom: 12, 
    textAlign: 'center'
  }
});

export default styles;