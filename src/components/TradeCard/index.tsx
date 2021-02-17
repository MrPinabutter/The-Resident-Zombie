import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import aid from '../../assets/items/aid.png'
import ak from '../../assets/items/ak.png'
import water from '../../assets/items/water.png'
import soup from '../../assets/items/soup.png'
import { TextInput } from 'react-native-gesture-handler';

interface TradeCardProp {
  header: string, 
  weight: number,
  setWeight: Function
}

export default function TradeCard({header, weight, setWeight}: TradeCardProp){
  const [valAid, setValAid] = useState('0')
  const [valAk47, setValAk47] = useState('0')
  const [valWater, setValWater] = useState('0')
  const [valSoup, setValSoup] = useState('0')

  useEffect(() => {
    let soma = Number(valAid) * 10 + Number(valSoup) * 12 + Number(valAk47) * 8 + Number(valWater) * 14
    setWeight(soma)

  }, [valAid, valAk47, valWater, valSoup])

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{header}</Text>
      </View>

      <View style={{justifyContent: 'center', width: '90%', alignItems: 'center'}}>

        <View style={styles.iconContainer}>
          <Image source={aid} style={{width: 30, height: 30}}></Image>
          <Text style={styles.text}>First Aid Pouch</Text>
          <TextInput style={[styles.text, styles.textInput]} value={`${Number(valAid)}`} onChangeText={setValAid} keyboardType="numeric" maxLength={4} ></TextInput>
        </View>

        <View style={styles.iconContainer}>
          <Image source={soup} style={{width: 30, height: 30}}></Image>
          <Text style={styles.text}>Campbell Soup</Text>
          <TextInput style={[styles.text, styles.textInput]} value={`${Number(valSoup)}`} onChangeText={setValSoup} keyboardType="numeric" maxLength={4}></TextInput>
        </View>

        <View style={styles.iconContainer}>
          <Image source={ak} style={{width: 30, height: 30}}></Image>
          <Text style={styles.text}>AK47</Text>
          <TextInput style={[styles.text, styles.textInput]} value={`${Number(valAk47)}`} onChangeText={setValAk47} keyboardType="numeric" maxLength={4}></TextInput>
        </View>

        <View style={styles.iconContainer}>
          <Image source={water} style={{width: 30, height: 30}}></Image>
          <Text style={styles.text}>Fiji Water</Text>
          <TextInput style={[styles.text, styles.textInput]} value={`${Number(valWater)}`} onChangeText={setValWater} keyboardType="numeric" maxLength={4}></TextInput>
        </View>
      </View>
      <Text style={[styles.text, {fontSize: 18, marginVertical: 4}]}> Weight = {weight} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 'auto',
    alignItems: 'center',
    backgroundColor: '#FFFFD0',
    borderRadius: 10,
    marginBottom: 15
  },

  header: {
    width: '100%',
    height: 36,
    backgroundColor: '#B6B669',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },

  headerText: {
    fontFamily: 'Staatliches_400Regular',
    fontSize: 24, 
    color: '#27251C',
  },
  
  iconContainer: {
    width: '90%', 
    height: 36, 
    backgroundColor: '#F1D368', 
    borderRadius: 4, 
    alignItems: 'center',
    marginTop: 12,
    paddingLeft: 10, 
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  text: {
    fontFamily: 'Oswald_400Regular', 
    fontSize: 16,  
    height: 30, 
    paddingHorizontal: 12
  },

  textInput: {
    backgroundColor: '#A6794F', 
    height: '100%', 
    borderTopRightRadius: 4, 
    borderBottomRightRadius: 4
  }
})