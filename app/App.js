// React/Redux
import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { store, persistor } from './store/index'
import { PersistGate } from 'redux-persist/integration/react'

// Navigation
import { createAppContainer } from 'react-navigation'
import switchNavigator from './navigation/MainTabNavigator'

// Components
import { Platform, StatusBar, StyleSheet, View } from 'react-native'

// Style
import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoadingComplete: false
    }

    this.handleFinishLoading = this.handleFinishLoading.bind(this)
  }

  loadResourcesAsync = async () => {
    await Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        'space-mono': {uri: require('./assets/fonts/SpaceMono-Regular.ttf')},
        ...Ionicons.font
      })
    ])
  }

  handleLoadingError(error) {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    //console.warn(error)
  }

  handleFinishLoading() {
    this.setState({
      isLoadingComplete: true
    })
  }

  render () {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      )
    } else {
      const AppContainer = createAppContainer(switchNavigator)
      return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <View style={styles.container}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <AppContainer />
            </View>
          </PersistGate>
        </Provider>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
