import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import * as Facebook from 'expo-facebook'
import PropTypes from 'prop-types'

import getEnvVars from '../../environment/environment'

import Styles from '../../constants/Styles'

export default class FBLoginButton extends React.Component {

    _handlePressAsync = async () => {
        
        const env = getEnvVars()

        try {
            await Facebook.initializeAsync(env.fbAppId)
            const response = await Facebook.logInWithReadPermissionsAsync({ permissions: ['public_profile'] })
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
                name='logo-facebook'
                type='ionicon'
                size={20}
                color='white'
                />
            }
            buttonStyle={Styles.outlineButtonStyle} 
            titleStyle={Styles.outlineButtonTextStyle} 
            containerStyle={styles.buttonContainer} 
            title='Facebook'
            onPress={this._handlePressAsync}
        />
    }
}

FBLoginButton.proptypes = {
    onLoginSuccess: PropTypes.func.isRequired,
    onLoginFail: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    socialButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
})