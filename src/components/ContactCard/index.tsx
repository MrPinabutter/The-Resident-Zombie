import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import warn from '../../assets/icons/warn.png';
import trash from '../../assets/icons/trash.png';
import trade from '../../assets/icons/trade.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

interface CardProps {
  name: string,
  id: string,
  setContacts: Function
}

export default function ContactCard({name, id, setContacts}: CardProps) {
  const { navigate } = useNavigation();

  function handleNavigateToTrade(){
    navigate('Trade')
  }

  function findIdx(contacts: CardProps){
    return contacts.id === id;
  }

  async function handleDeleteContact() {
    await AsyncStorage.getItem('@Friends')
      .then((json) => {
        const c = json ? JSON.parse(json) : [];
        c.splice(c.findIndex(findIdx), 1);
        setContacts(c)        
        AsyncStorage.setItem('@Friends', JSON.stringify(c));
      });
  }
  
  const LeftAction = () => {
    return (
      <View style={styles.swipeLeft}>
        <Image source={warn} style={{width: 20, height: 20}}/>
      </View>
    );
  };

  const RightAction = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <RectButton onPress={handleDeleteContact} style={[styles.swipeRight, {backgroundColor: '#BD1A2A', borderTopEndRadius: 0, borderBottomEndRadius: 0}]}>
          <Image source={trash} style={{width: 20, height: 20}}/>
        </RectButton>
        <RectButton onPress={handleNavigateToTrade} style={[styles.swipeRight, {backgroundColor: '#2CD85C'}]}>
          <Image source={trade} style={{width: 24, height: 24}}/>
        </RectButton>
      </View>
    );
  };

  return(
    <Swipeable 
      childrenContainerStyle={{width: '100%'}}
      renderLeftActions={LeftAction}  
      renderRightActions={RightAction}
      maxPointers={60}
      friction={3}
    >
      <View style={styles.cardContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.idText}>{id}</Text>
      </View>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%', 
    height: 60, 
    backgroundColor: '#F3F1F3', 
    borderRadius: 4, 
    justifyContent: 'center', 
    paddingHorizontal: 15,
    marginBottom: 15
  },

  nameText: {
    fontFamily: 'Montserrat_700Bold', 
    fontSize: 16, 
    color: '#25005E'
  },

  idText: {
    fontFamily: 'Montserrat_300Light', 
    fontSize: 12, 
    color: '#25005E'
  },

  swipeLeft: {
    backgroundColor: '#D8BF3D',
    width: 60,
    marginBottom: 15,
    borderTopLeftRadius: 4, 
    borderBottomLeftRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },

  swipeRight: {
    width: 60,
    marginBottom: 15,
    borderTopRightRadius: 4, 
    borderBottomRightRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
})