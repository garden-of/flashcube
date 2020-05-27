import React from 'react'
import PropTypes from 'prop-types'

import { View, StyleSheet, Text, Animated } from 'react-native'

import Colors from '../../constants/Colors'
import Styles from '../../constants/Styles'


class SegmentedProgressBar extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            learning: new Animated.Value(this.props.learning/this.props.total),
            learned: new Animated.Value(this.props.learned/this.props.total),
        }
    }

    componentDidUpdate(prevProps) {
        Animated.spring(
            this.state.learning,
            {toValue: this.props.learning/this.props.total}
        ).start()
        Animated.spring(
            this.state.learned,
            {toValue: this.props.learned/this.props.total}
        ).start()
    }

    render() {
        return <View style={styles.container}>
            <View style={styles.background}>
                <Animated.View 
                    style={{
                        backgroundColor: Colors.primaryTranparent3,
                        flexBasis: this.state.learned.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0%', '100%']
                        })
                    }}
                />
                <Animated.View 
                    style={{
                        backgroundColor: Colors.secondaryTransparent3,
                        flexBasis: this.state.learning.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0%', '100%']
                        })
                    }}
                />
            </View>
        </View>
    }
}

SegmentedProgressBar.proptypes = {
    learning: PropTypes.number,
    learned: PropTypes.number,
    total: PropTypes.number
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 7
    },
    background: {
        flex: 1,
        backgroundColor: Colors.gray6,
        display: 'flex',
        flexDirection: 'row'
    }
})

export default SegmentedProgressBar