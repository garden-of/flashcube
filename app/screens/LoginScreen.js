import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../actions/login'

import { View, StyleSheet, ImageBackground, Text } from 'react-native'
import { Input, Button, ButtonGroup, Icon } from 'react-native-elements'

import GoogleLoginButton from '../components/GoogleLoginButton/GoogleLoginButton'
import FBLoginButton from '../components/FBLoginButton/FBLoginButton'

import Colors from '../constants/Colors'
import Styles from '../constants/Styles'

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch)
}

class LoginScreen extends React.Component {

  render() {
    const loginButtons = [
      { element: () => <GoogleLoginButton /> },
      { element: () => <FBLoginButton /> }
    ]
  
    return (
      <View>
        <ImageBackground source={require('../assets/images/background.png')} style={styles.imgBackground}>
          <View style={styles.container}>
            <View style={styles.title}>
              <Text style={styles.titleText}>FLASHCUBE</Text>
            </View>
            <View style={styles.subtitle}>
              <Text style={styles.subtitleText}>Flashcube builds your vocabulary in multiple languages at once</Text>
            </View>
            <View style={styles.socialButtons}>
              <View style={styles.login}>
                <Text>Already have an account?</Text>
                <Button 
                  type='clear'
                  title='Login'
                  titleStyle={Styles.linkButtonTitle}
                />
              </View>
              <ButtonGroup 
                buttons={loginButtons}
                containerStyle={styles.socialButtonGroup}
                containerBorderRadius={10}
                innerBorderStyle={{
                  color: 'rgba(0, 0, 0, 0.1)',
                  width: 2
                }}
              />
            </View>
            <View style={styles.signUpForm}>
                <Input
                  leftIcon={
                    <Icon
                      name='ios-mail'
                      type='ionicon'
                      size={20}
                      color={Colors.gray2}
                    />
                  }
                  placeholder='email'
                  containerStyle={styles.textInputContainer}
                  inputContainerStyle={styles.textInputContainerContainer}
                  inputStyle={styles.textInput}
                  placeholderTextColor={Colors.gray2}
                />
                <Input
                  leftIcon={
                    <Icon
                      name='ios-lock'
                      type='ionicon'
                      size={20}
                      color={Colors.gray2}
                    />
                  }
                  placeholder='password'
                  containerStyle={styles.textInputContainer}
                  inputContainerStyle={styles.textInputContainerContainer}
                  inputStyle={styles.textInput}
                  placeholderTextColor={Colors.gray2}
                  secureTextEntry
                />
                <Button 
                  title='Create Account'
                  buttonStyle={Styles.transparentButtonStyle} 
                  titleStyle={Styles.outlineButtonTextStyle} 
                  containerStyle={styles.buttonContainer}
                />
            </View>
            <View style={styles.footer}>
              <Button 
                type='clear'
                title='Continue as Guest'
                titleStyle={Styles.linkButtonTitle}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imgBackground: {
    width: '100%',
    height: '100%'
  },
  container: {
    width: '100%',
    height: '100%',
    padding: 20,
    paddingTop: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  title: {
    flexBasis: '15%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  titleText: {
    color: Colors.white,
    fontSize: 41,
    fontWeight: '800',
    textTransform: 'uppercase'
  },
  subtitle: {
    flexBasis: '20%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  subtitleText: {
    color: Colors.tintColor,
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  socialButtons: {
    marginTop: 10,
    flexBasis: '10%'
  },
  socialButtonGroup: {
    width: '100%',
    backgroundColor: 'rgba(256, 256, 256, 0.35)',
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  signUpForm: {
    marginTop: 20,
    width: '100%',
    flexBasis: '35%'
  },
  textInputContainer: {
    width: '100%',
    marginBottom: 8,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 3,
  },
  textInputContainerContainer: {
    borderBottomWidth: 0
  },
  textInput: {
    width: '100%',
    paddingHorizontal: 10,
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
    paddingLeft: 10
  },
  buttonContainer: {
    marginTop: 5
  },
  footer: {
    flexBasis: '20%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingBottom: 25
  },
  login: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)