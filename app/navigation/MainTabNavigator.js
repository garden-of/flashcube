import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon/TabBarIcon'
import Colors from '../constants/Colors'
import Styles from '../constants/Styles'
import AuthLoading from '../screens/AuthLoading'
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import TowerScreen from '../screens/TowerScreen'
import TowerDetailScreen from '../screens/TowerDetailScreen'
import StorybookScreen from '../screens/StorybookScreen'

const config = {
  web: { headerMode: 'screen' },
  default: {},
  defaultNavigationOptions: {
    headerStyle: Styles.headerStyle,
    headerTitleStyle: Styles.headerTitleStyle,
    headerTintColor: Colors.white
  }
}

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    TowerDetailScreen: TowerDetailScreen
  },
  config
)

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home`
          : 'md-home'
      }
    />
  ),
}

HomeStack.path = '';

const TowerStack = createStackNavigator(
  {
    Towers: TowerScreen,
    TowerDetailScreen: TowerDetailScreen
  },
  config
)

TowerStack.navigationOptions = {
  tabBarLabel: 'Towers',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'logo-buffer'} />
  ),
}

TowerStack.path = ''

const StorybookStack = createStackNavigator(
  { 
    Storybooks: StorybookScreen 
  },
  config
)

StorybookStack.path = ''

const tabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    TowerStack,
    StorybookStack
  },
  {
    tabBarOptions: {
      activeBackgroundColor: Colors.primary,
      activeTintColor: Colors.white,
      inactiveBackgroundColor: Colors.primary,
      inactiveTintColor: Colors.tintColor,
      style: {
        backgroundColor: Colors.primary
      }
    }
  }
)
tabNavigator.path = ''

const switchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: tabNavigator,
    Auth: LoginScreen
  },
  {
    initialRouteName: 'AuthLoading',
  }
)

export default switchNavigator
