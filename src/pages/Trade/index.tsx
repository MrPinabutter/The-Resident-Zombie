import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import TradeCard from '../../components/TradeCard';

export default function Trade() {
  const [yourWeight, setYourWeight] = useState(0)
  const [otherWeight, setOtherWeight] = useState(0)

  return(
    <View style={styles.container}>
      <View style={styles.header}>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Trade</Text>
      </View>
      <ScrollView style={{width: '100%'}} contentContainerStyle={{alignItems: 'center'}}>
        <TradeCard header="Your items" weight={yourWeight} setWeight={setYourWeight}/>
        <TradeCard header="Carlos items" weight={otherWeight} setWeight={setOtherWeight}/>
      </ScrollView>

      <View style={styles.footer}>
        {yourWeight !== 0 && yourWeight === otherWeight ? 
        <View style={{width: '90%'}}>
          <Text style={styles.footerText}>
            weights match!!
          </Text>
          <RectButton style={{width: '100%', height: 50, backgroundColor: '#63B630', elevation: 3, borderRadius: 6, alignItems: 'center', justifyContent: 'center'}}> 
            <Text style={[styles.footerText, {fontSize: 36}]}>Trade</Text>
          </RectButton>
        </View>
        :
        <Text style={styles.footerText}>the Weight must be equal to trade</Text>
      }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#7D8C65'
  },

  header: {
    width: '100%', 
    height: 70, 
    backgroundColor: '#30402C', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between'
  },

  labelContainer: {
    backgroundColor: '#571331', 
    width: '90%', 
    height: 60, 
    borderTopLeftRadius: 123, 
    borderBottomLeftRadius: 123, 
    marginTop: -30, 
    marginBottom: 20, 
    alignSelf: 'flex-end', 
    justifyContent: 'center'
  },

  label: {
    fontFamily: 'Staatliches_400Regular', 
    fontSize: 36, 
    color: '#fff', 
    paddingLeft: 25
  },

  footer: {
    width: '100%', 
    height: 120, 
    backgroundColor: '#84658C', 
    justifyContent: 'center', 
    alignItems: 'center'
  },

  footerText: {
    fontFamily: 'Staatliches_400Regular',
    fontSize: 24, 
    color: '#fff'
  }
})