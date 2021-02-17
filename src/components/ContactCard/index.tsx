import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import warn from '../../assets/icons/warn.png';
import trash from '../../assets/icons/trash.png';
import trade from '../../assets/icons/trade.png';

interface CardProps {
  name: string,
  id: string
}

export default function ContactCard({name, id}: CardProps) {
  
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
        <View style={[styles.swipeRight, {backgroundColor: '#BD1A2A', borderTopEndRadius: 0, borderBottomEndRadius: 0}]}>
          <Image source={trash} style={{width: 20, height: 20}}/>
        </View>
        <View style={[styles.swipeRight, {backgroundColor: '#2CD85C'}]}>
          <Image source={trade} style={{width: 24, height: 24}}/>
        </View>
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