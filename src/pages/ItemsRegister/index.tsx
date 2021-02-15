import { Staatliches_400Regular } from '@expo-google-fonts/staatliches';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RectButton, ScrollView, TextInput } from 'react-native-gesture-handler';

export default function ItemsRegister(){
  return(
    <View style={{flex: 1, backgroundColor: '#E0DB64', alignItems: 'center'}}>
      <ScrollView style={{width: '100%'}} contentContainerStyle={{alignItems: 'center'}}>
        <View style={{width: '80%', marginTop: 60, marginBottom: 50}}>
          <Text style={{fontFamily: 'Staatliches_400Regular', fontSize: 36, color: '#25005E'}}>Let's get started</Text>
          <Text style={{fontFamily: 'Montserrat_400Regular', fontSize: 24, color: '#6518D8'}}>Now add your items in {'\n'}the app</Text>
        </View>
        
        <View style={{width: '80%', marginTop: 15}}>
          <Text style={{fontFamily: 'Montserrat_700Bold', fontSize: 18, color: '#27251C'}}>Item</Text>
          <TextInput style={[styles.textInput, {width: '100%', height: 40, backgroundColor: '#CFC557', borderRadius: 6, marginTop: 5, padding: 10}]} />
        </View>

        <View style={{marginTop: 15, width: '80%', flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '45%'}}>
            <Text style={{fontFamily: 'Montserrat_700Bold', fontSize: 18, color: '#27251C'}}>Amount</Text>
            <TextInput style={[styles.textInput, {width: '100%', height: 40, backgroundColor: '#CFC557', borderRadius: 6, marginTop: 5, padding: 10}]} />
          </View>
        </View>

      </ScrollView>

      <RectButton style={styles.button} >
        <Text style={styles.buttonText}>Finish</Text>
      </RectButton>
    </View>
  );
}

const styles = StyleSheet.create({
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