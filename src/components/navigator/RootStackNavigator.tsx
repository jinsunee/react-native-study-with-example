import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import AuthStack from './AuthStackNavigator';
import HomeBottom from './HomeBottomTabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  AuthStack: undefined;
};

export type RootStackNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AuthStack'
>;

export type defaultStackRouteProp = RouteProp<RootStackParamList, 'AuthStack'>;

const Stack = createStackNavigator<RootStackParamList>();

function RootStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="AuthStack" component={HomeBottom}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStackNavigator;
