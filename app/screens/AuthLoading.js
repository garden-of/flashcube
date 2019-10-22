import React from 'react'
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
  } from 'react-native';

import Colors from '../constants/Colors'

export default class AuthLoading extends React.Component {
    
    componentDidMount() {
        this._bootstrapAsync()
    }
    
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken')
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    }

    render() {
        return (
            <View style={styles.container}></View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    alignItems: "center",
    padding: 10
  },
  cardStyle: {
    maxHeight: 100
  }
})