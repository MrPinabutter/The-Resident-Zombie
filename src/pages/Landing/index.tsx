import React from 'react';
import { View, Text, Image } from 'react-native';
import { ceil } from 'react-native-reanimated';

import backpack from '../../assets/icons/backpack.png';
import gasMask from '../../assets/icons/gas-mask.png';

export default function Landing(){
  return (
    <View style={{flex: 1, backgroundColor: '#7D8C65'}}>
      <View style={{width: '100%', height: 170, backgroundColor: '#30402C', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Image source={gasMask} style={{width: 85, height: 85}} />
        <View style={{width: 55, height: 55, borderRadius: 30, backgroundColor: '#698C61', elevation: 3, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={backpack} style={{width: 35, height:35}} />
        </View>
      </View>
      <View style={{backgroundColor: '#571331', width: '90%', height: 60, borderTopLeftRadius: 123, borderBottomLeftRadius: 123, marginTop: -30, alignSelf: 'flex-end', justifyContent: 'center'}}>
        <Text style={{fontFamily: 'Staatliches_400Regular', fontSize: 36, color: '#fff', paddingLeft: 25}}>Contacts</Text>
      </View>

    </View>
  )
}