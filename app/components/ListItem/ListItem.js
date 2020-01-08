import React from 'react'
import PropTypes from 'prop-types'

import { View, StyleSheet, Text } from 'react-native'
import { ListItem as RNListItem, Icon } from 'react-native-elements'
import ProgressCircle from 'react-native-progress-circle'

import Colors from '../../constants/Colors'
import Styles from '../../constants/Styles'

class ListItemTitle extends React.Component {
    render() {
        return <View>
            <Text style={styles.listItemTitleLanguages}>{this.props.languages}</Text>
            <Text style={styles.listItemTitleTitle}>{this.props.title}</Text>
            <Text style={styles.listItemTitleDetail}>{this.props.subtitle}</Text>
        </View>
    }
}

class Chip extends React.Component {
    render() {
        return <View {...this.props} style={styles.chipContainer}>
            <Text style={styles.chip}>{this.props.text}</Text>
        </View>
    }
}


class ListItem extends React.Component {

    getRightItem() {
        switch(this.props.rightItem.type) {
            case 'chevron':
                return null
            case 'chip':
                return <Chip text={this.props.rightItem.text} onPress={this.props.rightItem.onPress}/>
            case 'progress':
                return <ProgressCircle
                    percent={this.props.rightItem.progress}
                    radius={30}
                    borderWidth={7}
                    color={Colors.primary}
                    shadowColor={Colors.gray1}
                    bgColor={Colors.white}
                >
                    <Text style={{ fontSize: 13 }}>{`${this.props.rightItem.progress}%`}</Text>
                </ProgressCircle>
            case 'icon':
                if (this.props.rightItem.checked) return <Icon name='ios-checkmark' type='ionicon' color={Colors.primary} size={35} onPress={this.props.rightItem.onPress}/>
                else return <Icon name='ios-add' type='ionicon' color={Colors.gray1} size={35} onPress={this.props.rightItem.onPress}/>   
            default:
                return null
        }
    }

    abbreviateString(title) {
        const maxLength = 27
        if (title.length < maxLength) return title
        else return title.substring(0, maxLength-3) + ' ...'
    }

    render() {
        return <RNListItem 
            title={<ListItemTitle 
                title={this.abbreviateString(this.props.title)}
                languages={this.abbreviateString(this.props.languages.join(' / '))}
                subtitle={this.abbreviateString(this.props.subtitle)}
            />}
            leftAvatar={{ 
                source: { uri: this.props.image !== null ? this.props.image : 'https://user-images.githubusercontent.com/101482/29592647-40da86ca-875a-11e7-8bc3-941700b0a323.png' },
                rounded: false,
                size: 'medium'
            }}
            containerStyle={styles.listItem}
            bottomDivider
            chevron={this.props.rightItem.type === 'chevron'}
            rightTitle={this.getRightItem()}
            onPress={this.props.onTap}
        />
    }
}

ListItem.proptypes = {
    languages: PropTypes.array,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    image: PropTypes.uri,
    onTap: PropTypes.func,
    rightItem: PropTypes.objectOf({
        type: PropTypes.oneOf([ 'icon', 'progress', 'chip', 'chevron' ]),
        onPress: PropTypes.func,
        checked: PropTypes.bool
    })
}

const styles = StyleSheet.create({
    chipContainer: {
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Colors.tintColor,
        backgroundColor: Colors.tintColor,
    },
    chip: {
        fontSize: 11,
        fontWeight: '600',
        lineHeight: 13,
        textTransform: 'uppercase',
        paddingVertical: 2,
        paddingHorizontal: 5
    },
    listItem: {
        paddingHorizontal: 20,
        width: '100%',
        height: 80
    },
    listItemTitleLanguages: {
        ...Styles.xsmallTagCaps,
        color: Colors.primary,
    },
    listItemTitleTitle: {
        ...Styles.regularText
    },
    listItemTitleDetail: {
        ...Styles.xsmallTagCaps,
        color: Colors.gray1,
    }
})

export default ListItem