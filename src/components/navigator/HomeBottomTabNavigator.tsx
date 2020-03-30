import {
  MaterialBottomTabNavigationProp,
  createMaterialBottomTabNavigator,
} from '@react-navigation/material-bottom-tabs';

import Home from '../screen/Home'
import React from 'react';
import { RouteProp } from '@react-navigation/native';
import SignIn from '../screen/SignIn'

export type BottomTabParamList = {
  Default: undefined;
};

export type defaultBottomTabNavigationProp = MaterialBottomTabNavigationProp<
  BottomTabParamList,
  'Default'
>;

export type defaultBottomTabRouteProp = RouteProp<
  BottomTabParamList,
  'Default'
>;

const Tab = createMaterialBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={SignIn} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
