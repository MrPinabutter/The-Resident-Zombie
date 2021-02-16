import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { RectButton, ScrollView, TextInput } from 'react-native-gesture-handler';
import { Picker } from '@react-native-community/picker';
import { Fontisto } from '@expo/vector-icons';

import styles from './styles'

interface CardType {
  [x: string ]: string
}

export default function ItemsRegister(){
  const [selectedItem, setSelectedItem] = useState<any>('Fiji Water');
  const [amountItems, setAmountItems] = useState('1');
  const [items] = useState(['Fiji Water', 'First Aid Pouch', 'AK47', 'Campbell Soup']);
  const [itemsCard, setItemsCard] = useState<CardType>({})

  function handleAddCardItem(){
    if(!amountItems){
      return alert('Amount invalid')
    }

    setItemsCard({...itemsCard, [selectedItem]: amountItems})
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
            <TextInput keyboardType="numeric" value={amountItems} onChangeText={setAmountItems} style={[styles.textInput, styles.amoutInput]} />
          </View>
          
          <View style={{width: '30%', paddingBottom: 10}}>
            <View style={{height: 22}} />
            <RectButton style={styles.addButton} onPress={handleAddCardItem}>
              <Text style={[styles.buttonText, {fontSize: 24}]}>Add</Text>
            </RectButton>
          </View>
        </View>
        
        <View style={{width: Dimensions.get('window').width*0.8, marginTop: 5}}>
          <Text style={[styles.label, {marginBottom: 10}]}>Your Items</Text>
          {items.map(i => {
            if (!!itemsCard[i]){
              return (
                <View key={i} style={{width: 'auto', height: 30, backgroundColor: '#A6794F', flexDirection: 'row', alignItems: 'center', marginBottom: 14, elevation: 3, justifyContent: 'space-between'}}>
                  <View style={{width: 'auto', minWidth: 40, backgroundColor: '#684B2E', height: '100%', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6}}>
                    <Text style={{fontFamily: 'Montserrat_700Bold', fontSize: 14, color: '#201F1A'}}>{itemsCard[i]}x</Text>
                  </View>
                  <Text style={{fontFamily: 'Staatliches_400Regular', fontSize: 16, color: '#201F1A', paddingHorizontal: 6}}>{i}</Text>
                  <Fontisto name="close-a" size={12} style={{paddingHorizontal: 10}} color="#201F1A" />
                </View>
              )}
          })}
        </View>

      </ScrollView>

      <RectButton style={styles.button}>
        <Text style={styles.buttonText}>Finish</Text>
      </RectButton>
    </View>
  );
}
