import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal'

import backpack from '../../assets/icons/backpack.png';
import gasMask from '../../assets/icons/gas-mask.png';
import ContactCard from '../../components/ContactCard';
import FabButton from '../../components/FabButton';
import AuthContext from '../../contexts/auth';
import api from '../../services/api';

import styles from './styles';

import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Landing(){
  const [isVisible, setVisible] = useState(false)
  const [inventory, setInventory] = useState(false) // For Modal Inventory
  const [id, setId] = useState('')
  const [name, setName] = useState('')

  const { navigate } = useNavigation();

  useEffect(() => {
    async function load(){
      await AsyncStorage.getItem('USER_ID').then(id => {
        api.get(`api/people/${id}`).then(res => {
          setId(res.data.id)
          setName(res.data.name)
        }).catch(erro => {
          console.log(erro);
        })
      })
    }
    load()
  }, [])

  function toggleModal() {
    setVisible(!isVisible)
  }

  function handleNavigateToQrScanner(){
    navigate('QrCam')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={gasMask} style={styles.gasMaskIcon} />
        <View style={{height: 80}}>
          <Text style={styles.statusText}>Survivor</Text>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.idText}>{id}</Text>
        </View>
        <View style={styles.inventory}>
          <Image source={backpack} style={{width: 35, height:35}} />
        </View>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Contacts</Text>
      </View>
      <ScrollView style={{width: '90%'}} contentContainerStyle={{justifyContent: 'center'}}>
        <ContactCard name="Rick Grimes" id="3cab6058-c440-4f92-a72e-76b4c2b1b39a"/>
        <ContactCard name="Daenery T" id="3cab6058-c440-4f92-a72e-76b4c2b1b39a"/>
        <ContactCard name="Clint Weastwood" id="3cab6058-c440-4f92-a72e-76b4c2b1b39a"/>
        <ContactCard name="Elon Musk" id="3cab6058-c440-4f92-a72e-76b4c2b1b39a"/>
        <ContactCard name="Brad Pitt" id="3cab6058-c440-4f92-a72e-76b4c2b1b39a"/>
        <ContactCard name="Bro" id="3cab6058-c440-4f92-a72e-76b4c2b1b39a"/>
        <ContactCard name="Elon Musk" id="3cab6058-c440-4f92-a72e-76b4c2b1b39a"/>
        <ContactCard name="Brad Pitt" id="3cab6058-c440-4f92-a72e-76b4c2b1b39a"/>
        <ContactCard name="Bro" id="3cab6058-c440-4f92-a72e-76b4c2b1b39a"/>
      </ScrollView>

      <FabButton addContact={handleNavigateToQrScanner} qrCode={toggleModal} />

      <Modal 
        isVisible={isVisible}
      >
        <View style={styles.modal}>
          <Text style={[styles.label, {color: '#25005E', fontSize: 24, paddingLeft: 0, marginBottom: 12}]}>Share this code to make friends</Text>
          <Text style={[styles.label, {color: '#51AB11', fontSize: 16, paddingLeft: 0, marginBottom: 8}]}>#sadfuhasdifuasdfa-nsdfoasjdf-dfdhafo</Text>
          <QRCode
            value="347e9f45-b06a-4083-827d-049058b4b6fe"
            size={200}
          />
            <TouchableOpacity onPress={toggleModal} style={styles.buttonModal}>
                <Text style={[styles.statusText, {fontSize: 35}]}>Close</Text>
            </TouchableOpacity>
        </View>
      </Modal>

    </View>
  )
}
