import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login';
import UserRegister from '../pages/UserRegister';
import ItemRegister from '../pages/ItemsRegister';

const { Navigator, Screen } = createStackNavigator();

function RegisterRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={Login} />
      <Screen name="Register" component={UserRegister} />
      <Screen name="Items" component={ItemRegister} />
    </Navigator>
  );
}

export default RegisterRoutes;