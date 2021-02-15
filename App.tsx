import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text } from 'react-native';

import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat'
import { Oswald_400Regular } from '@expo-google-fonts/oswald'
import { Staatliches_400Regular } from '@expo-google-fonts/staatliches'

import AppStack from './src/routes/AppStack'

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
    Oswald_400Regular,
    Staatliches_400Regular
  });

  if (!fontsLoaded) {
    return <View><Text>Oi</Text></View>;
  } else {
    return (
      <>
        <StatusBar style="dark"/>
        <AppStack />
      </>
    );
  }
}