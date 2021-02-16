import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { RectButton, ScrollView, TextInput } from 'react-native-gesture-handler';
import { Picker } from '@react-native-community/picker'

import styles from './styles'

export default function ItemsRegister(){
  const [selectedItem, setSelectedItem] = useState<any>('AK47')
  const [amountItems, setAmountItems] = useState('1')
  const [items] = useState(['Fiji Watter', 'First Aid Pouch', 'AK47', 'Campbell Soup'])

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
            <RectButton style={styles.addButton}>
              <Text style={[styles.buttonText, {fontSize: 24}]}>Add</Text>
            </RectButton>
          </View>
        </View>

      </ScrollView>

      <RectButton style={styles.button} >
        <Text style={styles.buttonText}>Finish</Text>
      </RectButton>
    </View>
  );
}
