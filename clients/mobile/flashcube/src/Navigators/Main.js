import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeContainer } from '@/Containers'

import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  DefaultVariables
} from '@/Theme'

const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-home'
              : 'ios-home-outline'
          } else if (route.name === 'Profile') {
            iconName = focused 
              ? 'ios-person' 
              : 'ios-person-outline'
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: DefaultVariables.Colors.primary,
        tabBarInactiveTintColor: DefaultVariables.Colors.disabled,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeContainer} />
      <Tab.Screen name="Profile" component={HomeContainer} />
    </Tab.Navigator>
  )
}

export default MainNavigator
