import React from 'react'
import PropTypes from 'prop-types'

import { View, StyleSheet, Text, Animated, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

import { speak } from '../../utils/utils'

import Colors from '../../constants/Colors'
import Styles from '../../constants/Styles'


class FlipCard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            animatedValue: new Animated.Value(0),
            value: 0
        }

        this.flipCard = this.flipCard.bind(this)
    }

    componentDidMount() {
        this.state.animatedValue.addListener(({ value }) => {
            this.setState({
                value: value
            })
          })
    }

    flipCard() {
        if (this.state.value >= 90) {
            Animated.spring(this.state.animatedValue, {
                toValue: 0,
                friction: 4,
                tension: 10
            }).start()
        } else {
            Animated.spring(this.state.animatedValue, {
                toValue: 180,
                friction: 4,
                tension: 10
            }).start()
        }
    }

    render() {

        const frontAnimatedStyle = {
            transform: [
                { 
                    rotateX: this.state.animatedValue.interpolate({
                        inputRange: [0, 180],
                        outputRange: ['0deg', '180deg']
                    }) 
                }
            ]
        }
        const backAnimatedStyle = {
            transform: [
                { 
                    rotateX: this.state.animatedValue.interpolate({
                        inputRange: [0, 180],
                        outputRange: ['180deg', '360deg']
                    }) 
                }
            ]
        }

        return <TouchableOpacity style={styles.container} onPress={this.flipCard}>
            <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                <Text style={Styles.regularText}>{this.props.frontText}</Text>
            </Animated.View>
            <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}>
                <Text style={[Styles.regularText, styles.cardBackLeft]}>{this.props.backText}</Text>
                <Icon 
                   type='ionicons'
                   name='volume-down'
                   containerStyle={styles.cardBackRight}
                   onPress={()=> speak(this.props.backText, this.props.languageCode)}
                   underlayColor={Colors.gray5}
                   color={Colors.gray2}
                />
            </Animated.View>
        </TouchableOpacity>
    }
}

FlipCard.proptypes = {
    frontText: PropTypes.string,
    backText: PropTypes.string,
    languageCode: PropTypes.string
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center'
   },
   flipCard: {
       width: '100%',
       height: 60,
       alignItems: 'center',
       justifyContent: 'center',
       backgroundColor: Colors.gray4,
       backfaceVisibility: 'hidden',
       display: 'flex',
       flexDirection: 'row'
   },
   flipCardBack: {
       backgroundColor: Colors.gray5,
       position: 'absolute',
       top: 0
   },
   cardBackLeft: {
       flexBasis: '90%',
       padding: 10
   },
   cardBackRight: {
       flexBasis: '10%'
   }
})

export default FlipCard