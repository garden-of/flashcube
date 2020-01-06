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
import LoginScreen from '../screens/LoginScreen'
import OnboardingLanguages from '../screens/OnboardingLanguages'
import OnboardingSets from '../screens/OnboardingSets'
import ProfileScreen from '../screens/ProfileScreen'
import SignupScreen from '../screens/SignupScreen'
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
  },
  headerMode: 'none'
}

const AuthStack = createAnimatedSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    Signup: SignupScreen,
    Login: LoginScreen
  },
  {
    ...config,
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-right"
          durationMs={300}
          interpolation="easeIn"
        />
        <Transition.In
          type="slide-left"
          durationMs={300}
          interpolation="easeIn"
        />
      </Transition.Together>
    )
  }
)

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    TowerDetailScreen: TowerDetailScreen,
    OnboardingLanguages: {
      screen: OnboardingLanguages,
      mode: 'modal'
    },
    OnboardingSets: OnboardingSets
  },
  {
    ...config,
    headerMode: 'none',
  }
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

TowerStack.navigationOptions = {
  tabBarLabel: 'Towers',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'logo-buffer'} />
  ),
}

TowerStack.path = ''

const ProfileStack = createStackNavigator(
  { 
    Profile: ProfileScreen
  },
  config
)

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
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

const StorybookStack = createStackNavigator(
  { 
    Storybooks: StorybookScreen 
  },
  config
)

StorybookStack.navigationOptions = {
  tabBarLabel: 'Storybook',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      color={focused ? Colors.primary : Colors.gray3}
      name={
        Platform.OS === 'ios'
          ? `ios-book`
          : 'md-book'
      }
    />
  ),
}

StorybookStack.path = ''

const tabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    TowerStack,
    ProfileStack,
    StorybookStack
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
tabNavigator.path = ''

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
