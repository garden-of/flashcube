import React from 'react';
import { View, StyleSheet } from 'react-native'
import { Button, Icon } from 'react-native-elements';

import Colors from '../../constants/Colors'
import Styles from '../../constants/Styles'

export default class FBLoginButton extends React.Component {

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