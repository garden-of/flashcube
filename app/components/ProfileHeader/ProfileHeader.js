import React from 'react'
import PropTypes from 'prop-types'

import { View, StyleSheet, Text, Image } from 'react-native'
import { Avatar } from 'react-native-elements'

import Colors from '../../constants/Colors'
import Styles from '../../constants/Styles'

import i18n from '../../localization/translations'

class ProfileHeader extends React.Component {


    joinAndShorten(terms, max_length=40) {
        if (!terms) return ''

        let joinedTerms = terms.join(', ')
        if (joinedTerms.length > 40) return joinedTerms.substring(0, max_length-4)+'...'
        return joinedTerms
    }

    render(){
        return <View style={styles.container}>
            <View style={styles.avatarContainer}>
                <Avatar 
                    rounded
                    source={{
                        uri: this.props.avatarUri ? this.props.avatarUri : 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
                    }}
                    size='large'
                    overlayContainerStyle={Styles.avatarStyle}
                />
            </View>
            <View style={styles.textContainer}>
                <View style={styles.userName}>
                    <Text style={Styles.mediumSemiBold}>{this.props.name}</Text>
                </View>
                <View style={styles.statContainer}>
                    <View style={styles.statLabel}>
                        <Text style={[Styles.xsmallSemiBold, {textTransform: 'uppercase'}]}>{i18n.t('profile.learning')}</Text>
                    </View>
                    <View style={styles.statValue}>
                        <Text style={{...Styles.xsmallText, ...Styles.uppercase, color: Colors.gray2}}>{this.joinAndShorten(this.props.learning)}</Text>
                    </View>
                </View>
                <View style={styles.statContainer}>
                    <View style={styles.statLabel}>
                        <Text style={[Styles.xsmallSemiBold, {textTransform: 'uppercase'}]}>{i18n.t('profile.sets')}</Text>
                    </View>
                    <View style={styles.statValue}>
                        <Text style={{...Styles.xsmallText, ...Styles.uppercase, color: Colors.gray2}}>{this.props.numSubscriptions} SETS</Text>
                    </View>
                </View>
                <View style={styles.statContainer}>
                    <View style={styles.statLabel}>
                        <Text style={[Styles.xsmallSemiBold, {textTransform: 'uppercase'}]}>{i18n.t('profile.words_mastered')}</Text>
                    </View>
                    <View style={styles.statValue}>
                        <Text style={{...Styles.xsmallText, ...Styles.uppercase, color: Colors.gray2}}>{this.props.cubesMastered}</Text>
                    </View>
                </View>
            </View>
        </View>
    }
}

ProfileHeader.proptypes = {
    avatarUri: PropTypes.uri,
    name: PropTypes.string,
    fluent: PropTypes.arrayOf(PropTypes.string),
    learning: PropTypes.arrayOf(PropTypes.string),
    numSubscriptions: PropTypes.number,
    cubesMastered: PropTypes.number
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    avatarContainer: {
        flexBasis: '25%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    },
    textContainer: {
        flexBasis: '75%',
        paddingLeft: 15
    },
    userName: {
        paddingBottom: 5
    },
    statContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    statValue: {
        paddingLeft: 5
    }
})

export default ProfileHeader