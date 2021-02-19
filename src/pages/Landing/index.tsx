import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { RectButton, TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import Modal from 'react-native-modal'
import QRCode from 'react-native-qrcode-svg';
import FabButton from '../../components/FabButton';

// IMAGES
import gasMask from '../../assets/icons/gas-mask.png';
import backpack from '../../assets/icons/backpack.png';
import ContactCard from '../../components/ContactCard';

// ICONS
import aid from '../../assets/items/aid.png'
import ak47 from '../../assets/items/ak.png'
import soup from '../../assets/items/soup.png'
import water from '../../assets/items/water.png'

import styles from './styles';
interface ContactProp{
  name: string,
  id: string,
}

interface ItemProp {
  item: {
    name: string,
    
  },
  quantity: number
}

export default function Landing(){
  // COMMON HOOKS
  const [id, setId] = useState('');
  const [friendId, setFriendId] = useState('');
  const [name, setName] = useState('');
  const [contacts, setContacts] = useState([{}] as any);
  const [inventory, setInventory] = useState([])

  // MODAL HOOKS
  const [qrViewModal, setQrViewModal] = useState(false);
  const [inventoryModal, setInventoryModal] = useState(false);
  const [addFriendModal, setAddFriendModal] = useState(false);
  const [updateLocationModal, setUpdateLocationModal] = useState(false);
  
  const { navigate } = useNavigation();

  async function loadInvetory(id:any){
    await api.get(`/api/people/${id}/properties.json`)
    .then(res => {
      console.log(id);
      setInventory(res.data)
      console.log(res.data);
    }).catch(e => {
      console.log(e);
    })
  }

  useEffect(() => {
    async function loadProfile(){
      await AsyncStorage.getItem('USER_ID').then(id => {
        console.log(id);
        api.get(`api/people/${id}`).then(res => {
          setId(res.data.id)  
          setName(res.data.name)
          loadInvetory(id); 
        }).catch(erro => {
          console.log(erro);
        })
      })
    }
    
    async function loadFriends(){
      await AsyncStorage.getItem('@Friends')
      .then((json) => {
        const c = json ? JSON.parse(json) : [];
        setContacts(c);
      })
    }

    loadProfile();
    loadFriends();
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
        <RectButton  onPress={() => setInventoryModal(true)} style={styles.inventory}>
          <Image source={backpack} style={{width: 35, height:35}} />
        </RectButton>
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
          <Text style={[styles.label, {color: '#25005E', fontSize: 24, paddingLeft: 0, marginBottom: 12}]}>Your items</Text>
          
          <View style={{width: '80%', height: 300, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap'}}>
            <View style={styles.itemInventory}>
              <Image source={aid} style={{width: 40, height: 40}} />
              <Text style={[styles.label, {color: '#000', fontSize: 18, paddingLeft: 0, marginBottom: 12}]}>Quantity: 
                {inventory.find((i:ItemProp) => i.item.name === 'First Aid Pouch') ? inventory.find((i:ItemProp) => i.item.name === 'First Aid Pouch')?.quantity : 0 }
              </Text>
            </View> 

            <View style={styles.itemInventory}>
              <Image source={ak47} style={{width: 40, height: 40}} />
              <Text style={[styles.label, {color: '#000', fontSize: 18, paddingLeft: 0, marginBottom: 12}]}>Quantity:
                {inventory.find((i:ItemProp) => i.item.name === 'AK47') ? inventory.find((i:ItemProp) => i.item.name === 'AK47')?.quantity : 0 }
              </Text>
            </View> 
            
            <View style={styles.itemInventory}>
              <Image source={water} style={{width: 40, height: 40}} />
              <Text style={[styles.label, {color: '#000', fontSize: 18, paddingLeft: 0, marginBottom: 12}]}>Quantity:
                {inventory.find((i:ItemProp) => i.item.name === 'Fiji Water') ? inventory.find((i:ItemProp) => i.item.name === 'Fiji Water')?.quantity : 0 }
              </Text>
            </View> 
            <View style={styles.itemInventory}>
              <Image source={soup} style={{width: 40, height: 40}} />
              <Text style={[styles.label, {color: '#000', fontSize: 18, paddingLeft: 0, marginBottom: 12}]}>Quantity:
                {inventory.find((i:ItemProp) => i.item.name === 'Campbell Soup') ? inventory.find((i:ItemProp) => i.item.name === 'Campbell Soup')?.quantity : 0 }
              </Text>
            </View> 
          </View>

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
