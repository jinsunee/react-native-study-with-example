import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import React from 'react';
import { RouteProp } from '@react-navigation/native';

export type StackParamList = {
  Default: undefined;
};

export type defaultStackNavigationProp = StackNavigationProp<
  StackParamList,
  'Default'
>;

export type defaultStackRouteProp = RouteProp<StackParamList, 'Default'>;

const Stack = createStackNavigator<StackParamList>();

function StackNavigator() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
    </Stack.Navigator>
  );
}

export default StackNavigator;
