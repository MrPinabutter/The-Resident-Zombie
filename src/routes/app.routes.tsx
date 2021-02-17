import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../pages/Landing';
import Trade from '../pages/Trade';
import QrCam from '../pages/QrReader';

const { Navigator, Screen } = createStackNavigator();

function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Landing" component={Landing} />
      <Screen name="Trade" component={Trade} />
      <Screen name="QrCam" component={QrCam} />
    </Navigator>
  );
}

export default AppRoutes;