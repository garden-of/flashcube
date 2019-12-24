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

  constructor(props) {
    super(props)

    this.state = {
      email: {},
      password: {}
    }

    this.handleCreateAccount = this.handleCreateAccount.bind(this)
    this.handleEmailFieldUpdate = this.handleEmailFieldUpdate.bind(this)
    this.handlePasswordFieldUpdate = this.handlePasswordFieldUpdate.bind(this)
  }

  emailIsValid(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  handleEmailFieldUpdate(e) {
    this.setState({ email: {
      ...this.state.email,
      value: e.nativeEvent.text
    } })
  }

  handlePasswordFieldUpdate(e) {
    this.setState({ password: {
      ...this.state.password,
      value: e.nativeEvent.text
    } })
  }

  handleCreateAccount() {
    let emailValid = true
    let passwordValid = true

    if (!this.state.email.value || !this.state.email.value.length > 0) {
      emailValid = false
      this.setState({
        email: {
          ...this.state.email,
          error: true,
          errorMessage: 'email address is required'
        }
      })
    }

    else if (!this.emailIsValid(this.state.email.value)) {
      emailValid = false
      this.setState({
        email: {
          ...this.state.email,
          error: true,
          errorMessage: 'please enter a valid email address'
        }
      })
    }

    if (emailValid) {
      this.setState({
        email: {
          value: this.state.email.value
        }
      })
    }

    if (!this.state.password.value || !this.state.password.value.length > 0) {
      passwordValid = false
      this.setState({
        password: {
          ...this.state.password,
          error: true,
          errorMessage: 'password is required'
        }
      })
    }

    else if (!this.passwordIsValid(this.state.password.value)) {
      passwordValid = false
      this.setState({
        password: {
          ...this.state.password,
          error: true,
          errorMessage: 'passwords must be 8 characters or longer'
        }
      })
    }

    if (passwordValid) {
      this.setState({
        password: {
          value: this.state.password.value
        }
      })
    }

    if (emailValid && passwordValid) {
      this.props.registerUser(this.state.email.value, this.state.password.value).then(() => {
        const { user }  = this.props.login
        if (user.isRegistered) this.props.loginUser(user.username, user.password)
      }).catch((response) => {console.log(response)})
    }

  }

  passwordIsValid(password) {
    return password.length > 8
  }

  renderEmailErrorMessage() {
    const { user } = this.props.login

    // if we are currently registering, return no error
    if (user.isRegistering) return null

    // UI errors take priority
    if (this.state.email.error) return this.state.email.errorMessage

    // if no UI errors, render API errors
    if (user.error) {
      if (Object.keys(user.errors).includes('username') || Object.keys(user.errors).includes('email')) {
        return 'hmm, looks like that email is already registered.  Try signing in instead.'
      }
    }

    // if no errors, return null
    return null

  }

  render() {
    const loginButtons = [
      { element: () => <GoogleLoginButton 
          onLoginSuccess={(r) => this.props.convertToken('google', r)}
          onLoginFail={() => console.log('login failed')}
        /> },
      { element: () => <FBLoginButton 
          onLoginSuccess={(r) => this.props.convertToken('facebook', r)}
          onLoginFail={() => console.log('login failed')}
        /> }
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
                  placeholderTextColor={Colors.gray2}
                  containerStyle={styles.textInputContainer}
                  inputContainerStyle={styles.textInputContainerContainer}
                  inputStyle={styles.textInput}
                  autoCapitalize='none'
                  onChange={this.handleEmailFieldUpdate}
                  errorMessage={this.renderEmailErrorMessage()}
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
                  autoCapitalize='none'
                  placeholderTextColor={Colors.gray2}
                  onChange={this.handlePasswordFieldUpdate}
                  errorMessage={this.state.password.error ? this.state.password.errorMessage : null}
                  secureTextEntry
                />
                <Button 
                  title='Create Account'
                  buttonStyle={Styles.transparentButtonStyle} 
                  titleStyle={Styles.outlineButtonTextStyle} 
                  containerStyle={styles.buttonContainer}
                  onPress={this.handleCreateAccount}
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
    marginHorizontal: 0
  },
  textInputContainerContainer: {
    borderBottomWidth: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 3,
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