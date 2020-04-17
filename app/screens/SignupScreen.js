import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../actions/user'

import { View, StyleSheet, KeyboardAvoidingView, Text,
         TouchableWithoutFeedback, Keyboard } from 'react-native'
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

class SignupScreen extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      email: {},
      password: {}
    }

    props.clearAuthErrors()

    this.handleCreateAccount = this.handleCreateAccount.bind(this)
    this.handleEmailFieldUpdate = this.handleEmailFieldUpdate.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handlePasswordFieldUpdate = this.handlePasswordFieldUpdate.bind(this)
    this.navigateTo = this.navigateTo.bind(this)
  }

  emailIsValid(email) {

    if (email == undefined) return false

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
      this.props.registerUser(this.state.email.value, this.state.password.value)
      .then(() => {
        const { registration, profile }  = this.props.user
        if (registration.isRegistered) this.props.loginUser(profile.username, profile.password)
      })
      .then(() => this.navigateTo('Home'))
      .catch((response) => {console.log(response)})
    }

  }

  handleLogin() {
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

    if (passwordValid) {
      this.setState({
        password: {
          value: this.state.password.value
        }
      })
    }

    if (emailValid && passwordValid) {
      this.props.loginUser(this.state.email.value, this.state.password.value)
      .then(() => this.props.getUserPreferences(this.props.user.profile))
      .then(() => this.navigateTo('Home'))
      .catch((response) => {console.log(response)})
    }

  }

  passwordIsValid(password) {
    if (password == undefined) return false
    return true
  }

  renderEmailErrorMessage() {
    const { registration } = this.props.user

    // if we are currently registering, return no error
    if (registration.isRegistering) return null

    // UI errors take priority
    if (this.state.email.error) return this.state.email.errorMessage

    // if no UI errors, render API errors
    if (registration.error) {
      if (Object.keys(registration.errors).includes('username') || Object.keys(registration.errors).includes('email')) {
        return 'hmm, looks like that email is already registered.  Try signing in instead.'
      }
    }

    // if no errors, return null
    return null

  }

  navigateTo(destination='Home') {
    if (!this.props.user.auth.isLoggedIn) return
    this.props.navigation.navigate(destination)
  }

  render() {

    const { auth } = this.props.user
    const { isRegistering } = this.props.user.registration

    const loginButtons = [
      { element: () => <GoogleLoginButton 
          onLoginSuccess={(r) => this.props.convertToken('google-oauth2', r).then(() => this.navigateTo('Home'))}
          onLoginFail={(response) => console.log(response)}
        /> },
      { element: () => <FBLoginButton 
          onLoginSuccess={(r) => this.props.convertToken('facebook', r).then(() => this.navigateTo('Home'))}
          onLoginFail={(response) => console.log(response)}
        /> }
    ]
  
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            <View style={styles.title}>
              <Text style={styles.titleText}>BOQU</Text>
            </View>
            <View style={styles.subtitle}>
              <Text style={styles.subtitleText}>Build your vocabulary in multiple languages</Text>
            </View>
            <View style={styles.socialButtons}>
              <View style={styles.login}>
                <Text>{isRegistering ? 'Already have an account?' : 'New here?'}</Text>
                <Button 
                  type='clear'
                  title={isRegistering ? 'Login' : 'Create An Account'}
                  titleStyle={Styles.linkButtonTitle}
                  onPress={() => this.props.toggleRegistration()}
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
                { auth.error
                  ? <Text style={styles.bigErrorMessage}>Hmm, looks like we don't recognize that username or password. Please try again.</Text>
                  : null
                }
                <Input
                  leftIcon={
                    <Icon
                      name='ios-mail'
                      type='ionicon'
                      size={20}
                      color={Colors.gray5}
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
                  errorStyle={styles.errorMessage}
                  textContentType='emailAddress'
                />
                <Input
                  leftIcon={
                    <Icon
                      name='ios-lock'
                      type='ionicon'
                      size={20}
                      color={Colors.gray5}
                    />
                  }
                  placeholder='password'
                  containerStyle={styles.textInputContainer}
                  inputContainerStyle={styles.textInputContainerContainer}
                  inputStyle={styles.textInput}
                  autoCapitalize='none'
                  placeholderTextColor={Colors.gray2}
                  onChange={this.handlePasswordFieldUpdate}
                  errorMessage={this.state.password.error && this.state.password.value ? this.state.password.errorMessage : null}
                  errorStyle={styles.errorMessage}
                  textContentType='password'
                  secureTextEntry
                />
                <Button 
                  title={isRegistering ? 'Create Account' : 'Login'}
                  buttonStyle={Styles.transparentButtonStyle}
                  disabledStyle={Styles.transparentButtonDisabledStyle}
                  disabledTitleStyle={Styles.transparentButtonDisabledTitleStyle} 
                  titleStyle={Styles.outlineButtonTextStyle} 
                  containerStyle={styles.buttonContainer}
                  onPress={isRegistering ? this.handleCreateAccount : this.handleLogin}
                  disabled={!(this.emailIsValid(this.state.email.value) 
                            && this.passwordIsValid(this.state.password.value))}
                />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.primary,
    flexGrow: 1
  },
  innerContainer: {
    width: '100%',
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  errorMessage: {
    ...Styles.smallText,
    color: Colors.white
  },
  bigErrorMessage: {
    ...Styles.smallSemiBold,
    color: Colors.tintColor,
    textAlign: 'center',
    marginBottom: 10    
  },  
  title: {
    flexBasis: '20%',
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
    flexBasis: '10%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  subtitleText: {
    ...Styles.subtitle,
    color: Colors.tintColor,
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  socialButtons: {
    flexBasis: '15%',
    display: 'flex',
    justifyContent: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    //paddingBottom: 5
  },
  socialButtonGroup: {
    width: '100%',
    backgroundColor: 'rgba(256, 256, 256, 0.2)',
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  signUpForm: {
    width: '100%',
    flexBasis: '55%',
    display: 'flex',
    justifyContent: 'flex-start'
  },
  textInputContainer: {
    width: '100%',
    paddingHorizontal: 0,
    marginHorizontal: 0,
    marginVertical: 5
  },
  textInputContainerContainer: {
    borderBottomWidth: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
    marginVertical: 5
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
    alignContent: 'center',
    justifyContent: 'center'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen)