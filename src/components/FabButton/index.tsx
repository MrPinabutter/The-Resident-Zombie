import React, { useState, useRef } from 'react';
import { View, Animated, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons'

interface FabProp {
  qrCode: Function,
  addContact: Function,
}

export default function FabButton({qrCode, addContact}: FabProp) {
  const animation = useRef(new Animated.Value(0)).current;
  const [isOpen, setOpen] = useState(false);

  function toggleMenu() {
    const toValue = isOpen ? 0 : 1;

    Animated.spring(animation, {
      toValue,
      friction: 7,
      useNativeDriver: true, 
    }).start();

    setOpen(!isOpen)
  }

  const qrStyle = {
    transform: [
      {scale: animation},
      {translateY: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -210]
      })}
    ]
  }

  const mapStyle = {
    transform: [
      {scale: animation},
      {translateY: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -140]
      })}
    ]
  }

  const addUserStyle = {
    transform: [
      {scale: animation},
      {translateY: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -70]
      })}
    ]
  }

  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg']
        })
      }
    ]
  }

  return(
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => qrCode()}>
        <Animated.View style={[styles.button, styles.submenu, qrStyle]}>
          <AntDesign name="qrcode" size={24} color="#000" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback>
        <Animated.View style={[styles.button, styles.submenu, mapStyle]}>
          <Feather name="map-pin" size={20} color="#000" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => addContact()}>
        <Animated.View style={[styles.button, styles.submenu, addUserStyle]}>
          <Ionicons name="person-add-outline" size={20} color="#000" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={toggleMenu}>
        <Animated.View style={[styles.button, rotation]}>
          <AntDesign name='plus' size={24} color="#FFF" />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 110,
    right: 40,
    alignItems: 'center'
  },

  button: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: '#392F40',
    alignItems: 'center', 
    justifyContent: 'center', 
    elevation: 4
  },

  submenu: {
    width: 50,
    height: 50,
    backgroundColor: '#806F8C',
  }
});