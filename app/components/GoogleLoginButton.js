import React from 'react';
import { View, StyleSheet } from 'react-native'
import { Button, Icon } from 'react-native-elements';

import Colors from '../constants/Colors'
import Styles from '../constants/Styles'

export default class FBLoginButton extends React.Component {

    render() {
        return <View style={styles.socialButton}>
        <Icon name='logo-google' type='ionicon' color={Colors.white} size={35} containerStyle={styles.socialIconContainer}/>
        <Button buttonStyle={Styles.outlineButtonStyle} titleStyle={Styles.outlineButtonTextStyle} containerStyle={styles.buttonContainer} type="outline" title="Login with Google" />
    </View>
    }
}

const styles = StyleSheet.create({
    socialButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    socialIconContainer:{
        padding: 5,
        paddingRight: 15
    },
    buttonContainer: {
        width: 250
    },
})