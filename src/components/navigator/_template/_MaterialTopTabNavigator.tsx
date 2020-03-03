import {
  MaterialTopTabNavigationProp,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';

import React from 'react';
import { RouteProp } from '@react-navigation/native';

export type TopTabParamList = {
  Default: undefined;
};

export type defaultTopTabNavigationProp = MaterialTopTabNavigationProp<
  TopTabParamList,
  'Default'
>;

export type defaultTopTabRouteProp = RouteProp<TopTabParamList, 'Default'>;

const Tab = createMaterialTopTabNavigator();

function TopTabNavigator() {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
}

export default TopTabNavigator;
