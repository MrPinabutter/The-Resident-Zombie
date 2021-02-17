import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { RectButton, ScrollView, TextInput } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import mapStyle from '../../assets/map/mapStyle.json'
import img from '../../assets/icons/marker.png'
import * as Location from 'expo-location';
import { Picker } from '@react-native-community/picker';

import styles from './styles'

export default function UserRegister(){
  const [name, setName] = useState('');
  const [gender, setGender] = useState('M');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState({latitude: -5.0688843, longitude: -42.7953127});
  const [errorMsg, setErrorMsg] = useState('');

  const { navigate } = useNavigation();
  
  function handleNavigateToItemsRegister(){
    if(!age || !name || !gender){
      return alert("Missing info")
    }
    navigate('Items', {name, gender, age, location});
  }
  
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

  return(
    <View style={styles.container}>
      <ScrollView style={{width: '100%'}} contentContainerStyle={{alignItems: 'center'}}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description1}>Let's get started</Text>
          <Text style={styles.description2}>First create your {'\n'}account</Text>
        </View>
        
        <View style={styles.nameContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput 
            value={name} 
            onChangeText={setName} 
            style={[styles.textInput, styles.nameText]} 
          />
        </View>

        <View style={styles.genderAgeContainer}>
          <View style={{width: '45%'}}>
            <Text style={styles.label}>Gender</Text>
            <View 
              style={styles.genderText}
              >
                <Picker
                  style={[styles.genderText, {marginTop: -1}]}
                  selectedValue={gender}
                  onValueChange={genderValue => setGender(`${genderValue}`)}
                >
                  <Picker.Item value="M" label="Male" />
                  <Picker.Item value="F" label="Female" />

                </Picker>
              </View>
          </View>

          <View style={{width: '45%'}}>
            <Text style={styles.label}>Age</Text>
            <TextInput 
              keyboardType="numeric" 
              value={age}
              onChangeText={setAge}
              style={[styles.textInput, styles.ageText]} />
          </View>
        </View>

        <View style={{width: '80%', marginTop: 15}}>
          <Text style={styles.label}>Where you are</Text>
          <View style= {styles.mapContainer}>
            <MapView 
              provider={PROVIDER_GOOGLE}
              customMapStyle={mapStyle}
              style={{width: '100%', height: '100%'}}
              region={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0122,
                longitudeDelta: 0.0121,}}
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
