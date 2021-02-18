import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal'

import backpack from '../../assets/icons/backpack.png';
import gasMask from '../../assets/icons/gas-mask.png';
import ContactCard from '../../components/ContactCard';
import FabButton from '../../components/FabButton';
import api from '../../services/api';

import styles from './styles';

import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';

interface ContactProp{
  name: string,
  id: string,
}

export default function Landing(){
  const [qrViewModal, setQrViewModal] = useState(false);
  const [inventoryModal, setInventoryModal] = useState(false);
  const [addFriendModal, setAddFriendModal] = useState(false);
  const [updateLocationModal, setUpdateLocationModal] = useState(false) ;
  const [id, setId] = useState('');
  const [friendId, setFriendId] = useState('');
  const [name, setName] = useState('');
  const [contacts, setContacts] = useState([{}] as any);

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

  useEffect(() => {
    async function load(){
      await AsyncStorage.getItem('@Friends')
      .then((json) => {
        const c = json ? JSON.parse(json) : [];
        console.log(c);
        setContacts(c);
      })
    }
    load()
  }, [])

  function handleNavigateToQrScanner(){
    navigate('QrCam') 
  }

  async function handleAddFriend(id: string) {
    await api.get(`api/people/${id}`).then(res => {
      const friend = {id: res.data.id, name: res.data.name}
      async function store(){
        await AsyncStorage.getItem('@Friends')
          .then((json) => {
            const c = json ? JSON.parse(json) : [];
            
            if(c.find((contact:any) => contact.id === id))return
            
            c.push(friend);
            
            AsyncStorage.setItem('@Friends', JSON.stringify(c));
          }
        );
      }
      store()
      
    }).catch(erro => {
      alert('Friend not found, try again');
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={gasMask} style={styles.gasMaskIcon} />
        <View style={{height: 80}}>
          <Text style={styles.statusText}>Survivor</Text>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.idText}>#{id}</Text>
        </View>
        <View style={styles.inventory}>
          <Image source={backpack} style={{width: 35, height:35}} />
        </View>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Contacts</Text>
      </View>
      <ScrollView style={{width: '90%'}} contentContainerStyle={{justifyContent: 'center'}} showsVerticalScrollIndicator={false}>
        {!!contacts && contacts.map((contact:ContactProp) => {
          return <ContactCard key={Math.random()} name={contact.name} id={contact.id} setContacts={setContacts} />
        })}
        
      </ScrollView>

      <FabButton addContact={() => setAddFriendModal(true)} qrCode={() => setQrViewModal(true)} />

      <Modal 
        isVisible={qrViewModal}
      >
        <View style={styles.modal}>
          <Text style={[styles.label, {color: '#25005E', fontSize: 24, paddingLeft: 0, marginBottom: 12}]}>Share this code to make friends</Text>
          <Text style={[styles.label, {color: '#51AB11', fontSize: 16, paddingLeft: 0, marginBottom: 8}]}>#{id}</Text>
          <QRCode
            value={id}
            size={200}
          />
            <TouchableOpacity onPress={() => setQrViewModal(false)} style={styles.buttonModal}>
                <Text style={[styles.statusText, {fontSize: 35}]}>Close</Text>
            </TouchableOpacity>
        </View>
      </Modal>
      
      <Modal 
        isVisible={inventoryModal}
      >
        <View style={styles.modal}>
          <Text style={[styles.label, {color: '#25005E', fontSize: 24, paddingLeft: 0, marginBottom: 12}]}>Share this code to make friends</Text>
          <Text style={[styles.label, {color: '#51AB11', fontSize: 16, paddingLeft: 0, marginBottom: 8}]}>#sadfuhasdifuasdfa-nsdfoasjdf-dfdhafo</Text>
          <QRCode
            value="347e9f45-b06a-4083-827d-049058b4b6fe"
            size={200}
          />
            <TouchableOpacity onPress={() => setInventoryModal(false)} style={styles.buttonModal}>
                <Text style={[styles.statusText, {fontSize: 35}]}>Close</Text>
            </TouchableOpacity>
        </View>
      </Modal>
      
      <Modal 
        isVisible={addFriendModal}
      >
        <View style={styles.modal}>
          <Text style={[styles.label, styles.textModal]}>Add new contact {'\n'} insert bellow the user ID{'\n'} or scan qr code</Text>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '80%'}}>
            <TextInput style={{flex: 3, height: 40, backgroundColor: '#CFC557', borderRadius: 6, paddingHorizontal: 15, fontFamily: 'Oswald_400Regular'}} value={friendId} onChangeText={val => setFriendId(val)}></TextInput>
            <View style={{flex:0.1}} />
            <TouchableOpacity onPress={() => handleAddFriend(friendId)} style={[styles.buttonModal, {backgroundColor: '#B6303D', flex: 1, marginTop: 0, height: 40}]}>
                <Text style={[styles.statusText, {fontSize: 24}]}>Add</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            onPress={() => {
              setAddFriendModal(false)
              handleNavigateToQrScanner()
            }} 
            style={[styles.buttonModal, {height: 40, backgroundColor: '#DF7412'}]}>
              <Text style={[styles.statusText, {fontSize: 24}]}>qr scanner</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setAddFriendModal(false)} style={[styles.buttonModal, {height: 40}]}>
              <Text style={[styles.statusText, {fontSize: 24}]}>Close Modal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      
      <Modal 
        isVisible={updateLocationModal}
      >
        <View style={styles.modal}>
          <Text style={[styles.label, {color: '#25005E', fontSize: 24, paddingLeft: 0, marginBottom: 12}]}>Share this code to make friends</Text>
          <Text style={[styles.label, {color: '#51AB11', fontSize: 16, paddingLeft: 0, marginBottom: 8}]}>#{id}</Text>
          <QRCode
            value={id}
            size={200}
          />
            <TouchableOpacity onPress={() => setUpdateLocationModal(false)} style={styles.buttonModal}>
                <Text style={[styles.statusText, {fontSize: 35}]}>Close</Text>
            </TouchableOpacity>
        </View>
      </Modal>

    </View>
  )
}
