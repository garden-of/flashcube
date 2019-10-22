import { StyleSheet } from 'react-native'

import Colors from './Colors'

export default StyleSheet.create({
    headerStyle: {
        backgroundColor: Colors.primary
    },
    headerTitleStyle: {
        color: Colors.white
    },
    headerLeftStyle: {
        color: Colors.white
    },
    headerRightStyle: {
        color: Colors.white
    },
    buttonStyle: {
        backgroundColor: Colors.primary
    },
    outlineButtonStyle: {
        backgroundColor: Colors.white,
        borderColor: Colors.primary
    },
    outlineButtonTextStyle: {
        color: Colors.primary
    },
    buttonContainerStyle: {
        padding: 5,
        justifyContent: "center"
    },
    inputInputContainerStyles: {
        borderColor: Colors.white,
        backgroundColor: Colors.white,
        borderWidth: 1,
        marginBottom: 5
    },
    inputInputStyles: {
        color: Colors.primary,
        paddingLeft: 5
    },
    inputLeftIconContainerStyle: {
    },
    inputLabelStyle: {
        color: Colors.white,
        marginBottom: 5
    }
})