import { StyleSheet } from 'react-native'

import Colors from './Colors'

const semibold = {
    fontWeight: 'bold',
    color: Colors.black
}

const link = {
    color: Colors.primary
}

const tag = {
    textTransform: 'uppercase',
    color: Colors.gray3
}

const medium = {
    color: Colors.black,
    fontFamily: 'System',
    fontSize: 20,
    lineHeight: 25,
    letterSpacing: 0.38,
}

const regular = {
    color: Colors.black,
    fontFamily: 'System',
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41
}

const small = {
    color: Colors.black,
    fontFamily: 'System',
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.24 
}

const xsmall = {
    color: Colors.black,
    fontFamily: 'System',
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.08
}

const xxsmall = {
    color: Colors.black,
    fontFamily: 'System',
    fontSize: 11,
    lineHeight: 13,
    letterSpacing: 0.07
}

export default StyleSheet.create({

    // spacing
    containerPadding: 10,

    headerStyle: {
        backgroundColor: Colors.white
    },
    headerTitleStyle: {
        color: Colors.primary
    },
    headerLeftStyle: {
        color: Colors.primary
    },
    headerRightStyle: {
        color: Colors.primary
    },
    modal: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        padding: 15,
        backgroundColor: Colors.primary
    },
    transparentButtonStyle: {
        backgroundColor: 'rgba(256, 256, 256, 0.2)',
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    transparentButtonDisabledStyle: {
        backgroundColor: 'rgba(256, 256, 256, 0.15)',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    transparentButtonDisabledTitleStyle: {
        ...small,
        ...semibold,
        color: Colors.gray5,
        paddingLeft: 10
    },
    buttonStyle: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
        borderRadius: 3
    },
    buttonTextStyle: {
        ...small,
        ...semibold,
        color: Colors.white,
    },
    outlineButtonStyle: {
        backgroundColor: 'transparent',
        borderColor: Colors.primary,
        borderRadius: 3,
        borderWidth: 1
    },
    outlineButtonTextStyle: {
        ...small,
        ...semibold,
        color: Colors.white,
    },
    buttonContainerStyle: {
    },
    iconButtonStyle: {
        backgroundColor: 'transparent',
    },
    iconButtonTextStyle: {
    },
    iconButtonContainerStyle: {
    },
    linkButton: {
        margin: 0,
        padding: 0
    },
    linkButtonTitle: {
        color: Colors.gray6,
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
    shadow: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
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
    },
    titleStyle: {
        width: '100%',
        paddingTop: 10,
        paddingBottom: 5,
        paddingHorizontal: 10,
    },
    subtitleStyle: {
        width: '100%',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },

    // TYPOGRAPHY
    uppercase: {
        textTransform: 'uppercase'
    },
    title: {
        fontSize: 31,
        lineHeight: 41,
        color: Colors.black,
        fontWeight: 'bold',
        fontFamily: 'System',
    },
    display1: {
        fontFamily: 'System',
        fontSize: 40,
        lineHeight: 48,
        color: Colors.black,
        fontWeight: 'bold'
    },
    display2: {
        fontFamily: 'System',
        fontSize: 28,
        lineHeight: 30,
        color: Colors.black,
        fontWeight: 'bold'
    },
    headline: {
        fontFamily: 'System',
        fontSize: 22,
        lineHeight: 28,
        color: Colors.black,
        fontWeight: 'bold',
        letterSpacing: 0.35
    },
    headlineSecondary: {
        fontFamily: 'System',
        fontSize: 22,
        lineHeight: 28,
        color: Colors.black,
        letterSpacing: 0.35
    },
    mediumSemiBold: {
        ...medium,
        ...semibold
    },
    mediumLink: {
        ...medium,
        ...link
    },
    mediumSemiBoldLink: {
        ...medium,
        ...semibold,
        ...link
    },
    mediumText: {
        ...medium,
    },
    regularSemiBold: {
        ...regular,
        ...semibold
    },
    regularLink: {
        ...regular,
        ...link
    },
    regularSemiBoldLink: {
        ...regular,
        ...semibold,
        ...link
    },
    regularText: {
        ...regular
    },
    smallSemiBold: {
        ...small,
        ...semibold
    },
    smallLink: {
        ...small,
        ...link
    },
    smallSemiBoldLink: {
        ...small,
        ...semibold,
        ...link
    },
    smallText: {
        ...small
    },
    smallTagCaps: {
        ...small,
        ...tag
    },
    xsmallSemiBold: {
        ...xsmall,
        ...semibold
    },
    xsmallLink: {
        ...xsmall,
        ...link
    },
    xsmallSemiBoldLink: {
        ...xsmall,
        ...semibold,
        ...link
    },
    xsmallText: {
        ...xsmall
    },
    xsmallTagCaps: {
        ...xsmall,
        ...tag
    },
    xxsmallTagCaps: {
        ...xxsmall,
        ...tag
    },
    xxsmallSemiBold: {
        ...xxsmall,
        ...semibold
    },
    xxsmallLink: {
        ...xxsmall,
        ...link
    },
    xxsmallSemiBoldLink: {
        ...xxsmall,
        ...semibold,
        ...link
    },
    xxsmallText: {
        ...xxsmall
    },
    xxsmallTagCaps: {
        ...xxsmall,
        ...tag
    },
})