import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch'
import { Transition } from 'react-native-reanimated'

import TabBarIcon from '../components/TabBarIcon/TabBarIcon'
import Colors from '../constants/Colors'
import Styles from '../constants/Styles'
import AuthLoading from '../screens/AuthLoading'
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import ProfileEditScreen from '../screens/ProfileEditScreen'
import SignupScreen from '../screens/SignupScreen'
import TowerScreen from '../screens/TowerScreen'
import TowerDetailScreen from '../screens/TowerDetailScreen'
//import StorybookScreen from '../screens/StorybookScreen'
import WriteScreen from '../screens/WriteScreen'
import FlashScreen from '../screens/FlashScreen'
import RevealScreen from '../screens/RevealScreen'

import i18n from '../localization/translations'

const config = {
  web: { headerMode: 'screen' },
  default: {},
  defaultNavigationOptions: {
    headerStyle: Styles.headerStyle,
    headerTitleStyle: Styles.headerTitleStyle,
    headerTintColor: Colors.primary
  },
  headerMode: 'none'
}

const AuthStack = createAnimatedSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    Signup: SignupScreen,
  },
  {
    ...config,
  }
)

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  {
    ...config,
    headerMode: 'none',
  }
)

HomeStack.navigationOptions = {
  tabBarLabel: i18n.t('nav.home'),
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
    TowerDetailScreen: TowerDetailScreen,
    WriteScreen: WriteScreen,
    FlashScreen: FlashScreen,
    RevealScreen: RevealScreen
  },
  {
    ...config,
    headerMode: 'screen',
    tabBarOptions: {
      safeAreaInset: {
        bottom: 'always',
        top: 'always'
      }
    }
  }
)

TowerStack.navigationOptions = {
  tabBarLabel: i18n.t('nav.towers'),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'logo-buffer'} />
  ),
}

TowerStack.path = ''

const ProfileStack = createStackNavigator(
  { 
    Profile: ProfileScreen,
    ProfileEdit: ProfileEditScreen
  },
  {
    ...config,
    tabBarOptions: {
      safeAreaInset: {
        bottom: 'always',
        top: 'always'
      }
    }
  }
)

ProfileStack.navigationOptions = {
  tabBarLabel: i18n.t('nav.profile'),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-person`
          : 'md-person'
      }
    />
  ),
}

const tabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    TowerStack,
    ProfileStack,
    //StorybookStack
  },
  {
    tabBarOptions: {
      activeBackgroundColor: Colors.white,
      activeTintColor: Colors.primary,
      inactiveBackgroundColor: Colors.white,
      inactiveTintColor: Colors.gray3,
      style: {
        backgroundColor: Colors.white
      }
    }
  }
)
tabNavigator.path = 'Home'

const switchNavigator = createAnimatedSwitchNavigator(
  {
    Auth: AuthStack,
    App: tabNavigator,
    Signup: SignupScreen,
  },
  {
    initialRouteName: 'Auth',
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-left"
          durationMs={300}
          interpolation="easeIn"
        />
        <Transition.In
          type="slide-right"
          durationMs={300}
          interpolation="easeIn"
        />
      </Transition.Together>
    )
  }
)

export default switchNavigator
