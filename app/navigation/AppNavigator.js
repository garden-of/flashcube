import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import * as Analytics from 'expo-firebase-analytics'

import MainTabNavigator from './MainTabNavigator'

function getActiveRouteName(navigationState) {
  if (!navigationState) return null
  const route = navigationState.routes[navigationState.index]
  // Parse the nested navigators
  if (route.routes) return getActiveRouteName(route)
  return route.routeName
}

const AppContainer = createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
  })
)

export default () => <AppContainer 
  onNavigationStateChange={ (prevState, currentState) => {
    const currentScreen = getActiveRouteName(currentState)
    const prevScreen = getActiveRouteName(prevState)

    if (prevScreen !== currentScreen) Analytics.setCurrentScreen(currentScreen)
  }}
/>