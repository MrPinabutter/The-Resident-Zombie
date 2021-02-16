import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

import backpack from '../../assets/icons/backpack.png';
import gasMask from '../../assets/icons/gas-mask.png';
import ContactCard from '../../components/ContactCard';
import FabButton from '../../components/FabButton';

export default function Landing(){
  return (
    <View style={{flex: 1, backgroundColor: '#7D8C65', alignItems: 'center'}}>
      <View style={{width: '100%', height: 170, backgroundColor: '#30402C', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Image source={gasMask} style={{width: 80, height: 80, marginHorizontal: 10}} />
        <View style={{height: 80}}>
          <Text style={{fontFamily: 'Staatliches_400Regular', fontSize: 24, color: '#fff'}}>Survivor</Text>
          <Text style={{fontFamily: 'Oswald_400Regular', fontSize: 18, color: '#C59D51'}}>Vitor Rafael Rocha Campelo</Text>
          <Text style={{fontFamily: 'Montserrat_400Regular', fontSize: 10, color: '#9A7F4C'}}>#347e9f45-b06a-4083-827d-049058b4b6fe</Text>
        </View>
        <View style={{width: 55, height: 55, borderRadius: 30, backgroundColor: '#698C61', elevation: 3, justifyContent: 'center', alignItems: 'center', marginHorizontal:12}}>
          <Image source={backpack} style={{width: 35, height:35}} />
        </View>
      </View>
      <View style={{backgroundColor: '#571331', width: '90%', height: 60, borderTopLeftRadius: 123, borderBottomLeftRadius: 123, marginTop: -30, marginBottom: 40, alignSelf: 'flex-end', justifyContent: 'center'}}>
        <Text style={{fontFamily: 'Staatliches_400Regular', fontSize: 36, color: '#fff', paddingLeft: 25}}>Contacts</Text>
      </View>
      <ScrollView style={{width: '90%'}} contentContainerStyle={{justifyContent: 'center'}}>
        <ContactCard name="Rick Grimes" id="3cab6058-c440-4f92-a72e-76b4c2b1b39a"/>
        <ContactCard name="Daenery T" id="3cab6058-c440-4f92-a72e-76b4c2b1b39a"/>
        <ContactCard name="Clint Weastwood" id="3cab6058-c440-4f92-a72e-76b4c2b1b39a"/>
        <ContactCard name="Elon Musk" id="3cab6058-c440-4f92-a72e-76b4c2b1b39a"/>
        <ContactCard name="Brad Pitt" id="3cab6058-c440-4f92-a72e-76b4c2b1b39a"/>
        <ContactCard name="Bro" id="3cab6058-c440-4f92-a72e-76b4c2b1b39a"/>
      </ScrollView>

      <FabButton />

    </View>
  )
}