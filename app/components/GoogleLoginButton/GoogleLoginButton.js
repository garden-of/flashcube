import React from 'react';
import { View, StyleSheet, Alert } from 'react-native'
import { Button, Icon } from 'react-native-elements'

import Styles from '../../constants/Styles'

import * as Google from 'expo-google-app-auth'

import getEnvVars from '../../environment/environment'

export default class GoogleLoginButton extends React.Component {

    _handlePressAsync = async () => {
        const env = getEnvVars()
        try {
            const response = await Google.logInAsync({
                iosClientId: env.googleClientId,
                scopes: ['profile', 'email']
            })
            if (response.type === 'success') {
                this.props.onLoginSuccess(response)
            } else {
                // cancelled
                return
            }
        }
        catch({ message }) {
            return
        }
    }

    render() {
        return <Button 
            icon={
                <Icon
                name='logo-google'
                type='ionicon'
                size={20}
                color='white'
                />
            }
            buttonStyle={[Styles.outlineButtonStyle, {borderWidth: 0}]} 
            titleStyle={Styles.outlineButtonTextStyle} 
            containerStyle={styles.buttonContainer} 
            title="Google" 
            onPress={this._handlePressAsync}
        />
    }
}

const styles = StyleSheet.create({
    socialButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    socialIconContainer:{
    },
    buttonContainer: {
    },
})