import React from 'react'
import PropTypes from 'prop-types'

import { View, StyleSheet, Text } from 'react-native'
import { ListItem as RNListItem, Icon } from 'react-native-elements'
import ProgressCircle from 'react-native-progress-circle'

import Colors from '../../constants/Colors'

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
        return <View style={styles.chipContainer}>
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
                return <Chip text={this.props.rightItem.text} />
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
                if (this.props.rightItem.checked) return <Icon name='ios-checkmark' type='ionicon' color={Colors.primary} size={35}/>
                else return <Icon name='ios-add' type='ionicon' color={Colors.gray1} size={35}/>   
            default:
                return null
        }
    }

    render() {
        return <RNListItem 
            title={<ListItemTitle 
                title={this.props.title}
                languages={this.props.languages.join(' / ')}
                subtitle={this.props.subtitle}
            />}
            leftAvatar={{ 
                source: { uri: this.props.image },
                rounded: false,
                size: 'medium'
            }}
            containerStyle={styles.listItem}
            bottomDivider
            chevron={this.props.rightItem.type === 'chevron'}
            rightTitle={this.getRightItem()}
        />
    }
}

ListItem.proptypes = {
    languages: PropTypes.array,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    image: PropTypes.uri,
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
        color: Colors.primary,
        fontSize: 11,
        fontWeight: '600',
        lineHeight: 13,
        textTransform: 'uppercase'
    },
    listItemTitleTitle: {
        color: Colors.black,
        fontSize: 15,
        lineHeight: 20
    },
    listItemTitleDetail: {
        color: Colors.gray1,
        fontSize: 13,
        lineHeight: 18,
        letterSpacing: -0.08
    }
})

export default ListItem