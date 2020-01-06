import React from 'react';
import { View, StyleSheet } from 'react-native'
import { Button, Icon } from 'react-native-elements'

import Styles from '../../constants/Styles'

const GOOGLE_CLIENT_ID = '498982492232-reae9rludoenv1497jcc757lm44hdspq.apps.googleusercontent.com'
import * as Google from 'expo-google-app-auth'

export default class GoogleLoginButton extends React.Component {

    _handlePressAsync = async () => {
        try {
            const response = await Google.logInAsync({
                iosClientId: GOOGLE_CLIENT_ID,
                scopes: ['profile', 'email']
            })
            if (response.type === 'success') {
                this.props.onLoginSuccess(response)
            } else {
                this.props.onLoginFail(response)
            }
        }
        catch({ message }) {
            this.props.onLoginFail(message)
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
            buttonStyle={Styles.outlineButtonStyle} 
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