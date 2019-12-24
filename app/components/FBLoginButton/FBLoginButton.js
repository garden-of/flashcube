import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import * as Facebook from 'expo-facebook'

import Colors from '../../constants/Colors'
import Styles from '../../constants/Styles'

export default class FBLoginButton extends React.Component {

    _handlePressAsync = async () => {
        try {
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
              } = await Facebook.logInWithReadPermissionsAsync(
                '468157980709865',
                { permissions: ['public_profile'] }
            )
            if (type === 'success') {
                console.log('logged in!')
            } else {
                console.error('login failed')
            }
        }
        catch({ message }) {
            console.error(message)
        }
    }

    render() {
        console.log(Facebook)
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