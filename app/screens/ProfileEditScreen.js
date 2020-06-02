import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as Analytics from 'expo-firebase-analytics'

import { View, StyleSheet, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Picker } from 'react-native'
import { Button, Input } from 'react-native-elements'

import * as actions from '../actions/user'

import Styles from '../constants/Styles'
import Colors from '../constants/Colors'

const mapStateToProps = state => ({
  ...state
})
  
const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch)
}

class ProfileEditScreen extends React.Component {
  
  constructor(props) {
    super(props)

    const module = this.props.navigation.getParam('module')
    const field = this.props.navigation.getParam('field')
    
    if (module === 'preferences') {
        this.state = {
            value: this.props.user.profile.preferences[field],
            initialValue: this.props.user.profile.preferences[field]
        }
    } else {
        this.state = {
            value: this.props.user.profile[field],
            initialValue: this.props.user.profile[field]
        }
    }
  }

  renderInput(module, field, input) {

    const { profile } = this.props.user

    if (input === 'text') {
        return <Input 
            value={this.state.value}
            onChangeText={t => this.setState({ value: t })}
            autoFocus={true}
        />
    }
    if (input === 'picker') {
        return <Picker
            selectedValue={this.state.value}
            onValueChange={value => this.setState({ value })}
        >
            {this.props.tower.categories.categories.map( (c, index) => <Picker.Item 
                label={c.category}
                value={c.id}
                key={index}
            />)}
        </Picker>
    }

  }

  saveValue() {

    const module = this.props.navigation.getParam('module')
    const field = this.props.navigation.getParam('field')

    if (module === 'preferences') {
        this.props.updateUserPreferences({
            id: this.props.user.profile.preferences.id,
            [field]: this.state.value
        }).then(this.props.navigation.goBack())
    } else if (module === 'profile') {
        this.props.updateUserProfile({
            [field]: this.state.value
        }).then(this.props.navigation.goBack())
    }

  }

  render() {

    const { navigation } = this.props

    const inputType = navigation.getParam('input', 'text')
    const module = navigation.getParam('module')
    const field = navigation.getParam('field')

    return <KeyboardAvoidingView 
        style={styles.container}
        behavior={'height'}
    >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
                <View style={styles.header}>
                    <Text style={Styles.mediumSemiBold}>{`Edit ${field.charAt(0).toUpperCase() + field.slice(1)}`}</Text>
                </View>
                <View style={styles.content}>
                    {this.renderInput(module, field, inputType)}
                </View>
                <View style={styles.actions}>
                    <Button 
                        title='Save'
                        buttonStyle={Styles.buttonStyle}
                        titleStyle={Styles.buttonTextStyle} 
                        containerStyle={Styles.buttonContainerStyle}
                        onPress={() => this.saveValue()}
                        disabled={this.state.value == this.state.initialValue}
                    />
                    <Button 
                        title='Cancel'
                        buttonStyle={{...Styles.invertedButtonStyle, backgroundColor: Colors.gray6 }}
                        titleStyle={Styles.invertedButtonTextStyle} 
                        containerStyle={Styles.buttonContainerStyle}
                        onPress={() => this.props.navigation.goBack()}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    display: 'flex',
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    padding: 10,
    paddingTop: 70,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    
  },    
  content: {
    
  },
  actions: {
    
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditScreen)