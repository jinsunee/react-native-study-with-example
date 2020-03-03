import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import React from 'react';
import { RouteProp } from '@react-navigation/native';
import SignIn from '../screen/SignIn';
import SignUp from '../screen/SignUp';

export type StackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type defaultStackNavigationProp = StackNavigationProp<
  StackParamList,
  'SignIn'
>;

export type defaultStackRouteProp = RouteProp<StackParamList, 'SignIn'>;

const Stack = createStackNavigator<StackParamList>();

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
