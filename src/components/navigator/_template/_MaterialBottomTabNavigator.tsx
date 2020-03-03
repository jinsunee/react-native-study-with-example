import {
  MaterialBottomTabNavigationProp,
  createMaterialBottomTabNavigator,
} from '@react-navigation/material-bottom-tabs';

import React from 'react';
import { RouteProp } from '@react-navigation/native';

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
      {/* <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
