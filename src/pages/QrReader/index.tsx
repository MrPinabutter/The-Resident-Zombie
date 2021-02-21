import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, StackActions } from '@react-navigation/native';

export default function QrScanner() {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: any) => {
    setScanned(true);
    handleAddFriend(data);
  };

  const pushAction = StackActions.push('Landing')
  const { dispatch } = useNavigation()
  
  function handleNavigateToLanding(){
    dispatch(pushAction)
  }

  async function handleAddFriend(id: string) {
    await api.get(`api/people/${id}`).then(res => {
      const friend = {id: res.data.id, name: res.data.name}
      async function store(){
        await AsyncStorage.getItem('@Friends')
          .then((json) => {
            const c = json ? JSON.parse(json) : [];
            
            if(c.find((contact:any) => contact.id === id)) return
            
            c.push(friend);
            
            AsyncStorage.setItem('@Friends', JSON.stringify(c));

          }).then(() => handleNavigateToLanding());
        }
        store()
    }).catch(erro => {
      alert('Friend not found, try again');
    })
  }
        

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? ()=>{} : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})