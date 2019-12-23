import React from 'react'
import { Image, View, StyleSheet } from 'react-native'
import { Button, Divider, Input, Icon } from 'react-native-elements'

import Colors from '../constants/Colors'
import StorybookUIRoot from '../storybook'

export default function LoginScreen() {
  return (
    <StorybookUIRoot />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  titleContainer: {
    flex: 2,
    justifyContent: "flex-end",
    paddingBottom: 20
  },
  socialContainer: {
    flex: 1,
    paddingTop: 10,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  socialButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  formButtonContainer: {
    width: 280,
    marginTop: 15
  },
  formContainer: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleStyle: {
      color: Colors.white,
      fontSize: 20,
      fontWeight: "bold"
  },
  textInputStyle: {
      width: 300,
      paddingTop: 5
  },
  dividerStyle: {
      height: 1,
      width: 300,
      backgroundColor: Colors.white,
      margin: 30,
  }
})