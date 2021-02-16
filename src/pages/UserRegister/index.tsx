import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { RectButton, ScrollView, TextInput } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import img from '../../assets/icons/marker.png'
import * as Location from 'expo-location';

import styles from './styles'

export default function UserRegister(){
  const [location, setLocation] = useState({latitude: -5.0688843, longitude: -42.7953127});
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation({latitude: location.coords.latitude, longitude: location.coords.longitude});
      
    })();
  }, []);

  const { navigate } = useNavigation();

  function handleNavigateToItemsRegister(){
    navigate('Items')
  }

  return(
    <View style={styles.container}>
      <ScrollView style={{width: '100%'}} contentContainerStyle={{alignItems: 'center'}}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description1}>Let's get started</Text>
          <Text style={styles.description2}>First create your {'\n'}account</Text>
        </View>
        
        <View style={styles.nameContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput style={[styles.textInput, styles.nameText]} />
        </View>

        <View style={styles.genderAgeContainer}>
          <View style={{width: '45%'}}>
            <Text style={styles.label}>Gender</Text>
            <TextInput style={[styles.textInput, styles.genderText]} />
          </View>
          <View style={{width: '45%'}}>
            <Text style={styles.label}>Age</Text>
            <TextInput keyboardType="numeric" style={[styles.textInput, styles.ageText]} />
          </View>
        </View>

        <View style={{width: '80%', marginTop: 15}}>
          <Text style={styles.label}>Where you are</Text>
          <View style= {styles.mapContainer}>
            <MapView style={{width: '100%', height: '100%'}} 
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              >
              <Marker coordinate={{
                latitude: location.latitude, 
                longitude: location.longitude,
              }} image={img}/>
            </MapView>
          </View>
        </View>
      </ScrollView>

      <RectButton style={styles.button} onPress={handleNavigateToItemsRegister} >
        <Text style={styles.buttonText}>Continue</Text>
      </RectButton>
    </View>
  );
}
