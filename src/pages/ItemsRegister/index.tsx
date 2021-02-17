import React, { useContext, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton, ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Picker } from '@react-native-community/picker';
import { Fontisto } from '@expo/vector-icons';

import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';

import styles from './styles'

import api from '../../services/api'
import AuthContext from '../../contexts/auth';

interface ParamProps {
  name: string | undefined,
  age: string | undefined,
  gender: string | undefined,
  location:{
    latitude: Number | undefined,
    longitude: Number | undefined
  }
}

interface CardType {
  [x: string ]: string
}

export default function ItemsRegister(){
  const [selectedItem, setSelectedItem] = useState<any>('Fiji Water');
  const [amountItems, setAmountItems] = useState('1');
  const [items] = useState(['Fiji Water', 'First Aid Pouch', 'AK47', 'Campbell Soup']);
  const [itemsCard, setItemsCard] = useState<CardType>({})

  const {getData} = useContext(AuthContext)
  
  const { name, age, gender, location }: any = useRoute().params;

  async function saveLocal(id: string) {
    try {
      await AsyncStorage.setItem('USER_ID', id);

    } catch(e) {
      console.log(e);
    }
  }
  
  function handleSubmit(){
    const paramsURl = new URLSearchParams() 
    paramsURl.append('person[name]', name)
    paramsURl.append('person[age]', age)
    paramsURl.append('person[gender]', gender)
    paramsURl.append('person[lonlat]', `Point(${location.latitude} ${location.longitude})`)
    paramsURl.append('items', `Fiji Water:${itemsCard['Fiji Water'] ? itemsCard['Fiji Water']: 0 };` + 
      `First Aid Pouch:${itemsCard['First Aid Pouch'] ? itemsCard['First Aid Pouch'] : 0};` + 
      `AK47:${itemsCard['AK47'] ? itemsCard['AK47'] : 0};` +
      `Campbell Soup:${itemsCard['Campbell Soup'] ? itemsCard['Campbell Soup'] : 0}`
    )

    api.post('/api/people.json', paramsURl).then((e) => {
      console.log("Survivor Created");
      saveLocal(e.data.id)
    }).then(() => {
      getData()
    }).catch((e) => {
      console.log("Error", e);
    })
  }

  function handleAddCardItem(){
    if(!amountItems){
      return alert('Amount invalid')
    }
    setItemsCard({...itemsCard, [selectedItem]: amountItems})
  }

  function handleRemoveItem(idx: any){
    setItemsCard({...itemsCard, [idx]: null})
  }

  return(
    <View style={styles.container}>
      <ScrollView style={{width: Dimensions.get('window').width}} contentContainerStyle={{alignItems: 'center'}}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description1}>Let's get started</Text>
          <Text style={styles.description2}>Now add your items in {'\n'}the app</Text>
        </View>
        
        <View style={{width: '80%', marginTop: 15}}>
          <Text style={styles.label}>Item</Text>

          <View style={styles.pickerContainer}>
            <Picker 
              selectedValue={selectedItem} 
              onValueChange={itemVal => setSelectedItem(itemVal)} 
              style={[styles.textInput, styles.picker]}
            >
              {items.map((lab) => {
                return <Picker.Item label={lab} value={lab} key={lab}/>
              })}
            </Picker>
          </View>
        </View>

        <View style={styles.amountContainer}>
          <View style={{width: '60%'}}>
            <Text style={styles.label}>Amount</Text>
            <TextInput 
              keyboardType="numeric" 
              value={amountItems} 
              onChangeText={amount =>{
                if(!isNaN(Number(amount))){
                  setAmountItems(amount)
                } 
              }} 
              style={[styles.textInput, styles.amoutInput]} 
            />
          </View>
          
          <View style={{width: '30%', paddingBottom: 10}}>
            <View style={{height: 22}} />
            <RectButton style={styles.addButton} onPress={handleAddCardItem}>
              <Text style={[styles.buttonText, {fontSize: 24}]}>Add</Text>
            </RectButton>
          </View>
        </View>

        <Text style={[styles.label, {marginBottom: 10, marginLeft: '10%', alignSelf: 'flex-start'}]}>Your Items</Text>
        {items.map(i => {
          if (!!itemsCard[i]){
            return (
              <View key={i} style={{height: 30, backgroundColor: '#A6794F', flexDirection: 'row', alignItems: 'center', marginBottom: 14, elevation: 3, justifyContent: 'space-between', marginLeft: '10%', alignSelf: 'flex-start'}}>
                <View style={{minWidth: 40, backgroundColor: '#684B2E', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontFamily: 'Montserrat_700Bold', fontSize: 14, color: '#201F1A', marginHorizontal: 6 }}>{Number(itemsCard[i])}x</Text>
                </View>
                <Text style={{fontFamily: 'Staatliches_400Regular', fontSize: 16, color: '#201F1A', paddingHorizontal: 6}}>{i}</Text>
                <TouchableOpacity onPress={() => handleRemoveItem(i)}>
                  <Fontisto name="close-a" size={12} style={{paddingHorizontal: 10}} color="#201F1A" />
                </TouchableOpacity>
              </View>
            )}
        })}

      </ScrollView>

      <RectButton style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Finish</Text>
      </RectButton>
    </View>
  );
}
