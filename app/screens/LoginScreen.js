import React from 'react'
import { Image, View, StyleSheet } from 'react-native'
import { Button, Divider, Input, Icon } from 'react-native-elements'

import Colors from '../constants/Colors'
import Styles from '../constants/Styles'

import FBLoginButton from '../components/FBLoginButton'
import GoogleLoginButton from '../components/GoogleLoginButton'

export default function LoginScreen() {
  return (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Image style={{width: 60, height: 60}} source={require('../assets/images/logo.png')}/>
        </View>
        <View style={styles.socialContainer}>
            <FBLoginButton />
            <GoogleLoginButton />
        </View>
        <View style={styles.formContainer}>
            <Divider style={styles.dividerStyle}/>
            <Input 
                placeholder='enter your email address'
                label='email'
                labelStyle={Styles.inputLabelStyle}
                inputContainerStyle={Styles.inputInputContainerStyles}
                inputStyle={Styles.inputInputStyles}
                containerStyle={styles.textInputStyle}
            />
            <Input 
                placeholder='enter your password'
                label='password'
                labelStyle={Styles.inputLabelStyle}
                inputContainerStyle={Styles.inputInputContainerStyles}
                inputStyle={Styles.inputInputStyles}
                containerStyle={styles.textInputStyle}
            />
            <Button buttonStyle={Styles.outlineButtonStyle} titleStyle={Styles.outlineButtonTextStyle} containerStyle={styles.formButtonContainer} type="outline" title="Login" />
        </View>
    </View>
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