import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { RectButton, TextInput } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import cros from '../../assets/images/cross.png'
import logo from '../../assets/images/logo.png'

import styles from './styles'

export default function Landing(){
  const { navigate } = useNavigation()

  function handleNavigationToRegister(){
    navigate('Register')
  }

  return(
    <LinearGradient 
      style={styles.container}
      colors={['#524531', '#387115']}
      start={{x:0,y:0}}
	    end={{x:1,y:1}}
    >
      <Image source={cros} style={{width: '100%', height: Dimensions.get('window').width*1674/1125, position: 'absolute', bottom: 0}} />
      <View style={styles.logo}>
        <Image source={logo} style={{width: 253.22, height: 91 }} />
        <Text style={styles.logoText}>Survive with us</Text>
      </View>
      <RectButton style={styles.button} onPress={handleNavigationToRegister}>
        <Text style={styles.buttonText}>Start</Text>
      </RectButton>
    </LinearGradient >
  )
}
