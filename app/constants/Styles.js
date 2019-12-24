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
    transparentButtonStyle: {
        backgroundColor: 'rgba(256, 256, 256, 0.35)',
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    outlineButtonStyle: {
        backgroundColor: 'transparent',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    outlineButtonTextStyle: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: '600',
        paddingLeft: 10
    },
    buttonContainerStyle: {
    },
    linkButton: {
        margin: 0,
        padding: 0
    },
    linkButtonTitle: {
        color: Colors.gray3,
        fontSize: 14,
        fontWeight: '600',
        textDecorationLine: 'underline'
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