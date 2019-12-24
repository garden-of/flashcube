import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { AuthSession } from 'expo'

import Colors from '../../constants/Colors'
import Styles from '../../constants/Styles'

const FB_APP_ID = '468157980709865';

export default class FBLoginButton extends React.Component {

    _handlePressAsync = async () => {
        let redirectUrl = AuthSession.getRedirectUrl()

        let result = await AuthSession.startAsync({
            authUrl:
                `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
                `&client_id=${FB_APP_ID}` +
                `&redirect_uri=${encodeURIComponent(redirectUrl)}`,

        })

        if (result.type != 'success') {
            console.error('something went wrong')
            return
        }

        let accessToken = result.params.access_token
        console.log(result.params)
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

const styles = StyleSheet.create({
    socialButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
})