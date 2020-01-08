import React from 'react'
import PropTypes from 'prop-types'

import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'

import Colors from '../../constants/Colors'
import Styles from '../../constants/Styles'

class PreferenceSelector extends React.Component {

    constructor(props) {
        super(props)


    }

    renderPreferenceOptions() {
        const { options, learning, fluent } = this.props

        return options
            .sort((a, b) => {
                if (a.category > b.category) return 1
                else if (a.category < b.category) return -1
                return 0
            })
            .map((option, index) => {
                let selected = 0
                if (learning.includes(option.id)) selected = 1
                if (fluent.includes(option.id)) selected = 2

                return <View style={styles.gridRow} key={index}>
                    <View style={styles.gridColWide}>
                        <Text style={Styles.regularSemiBold}>{option.category}</Text>
                    </View>
                    <View style={styles.gridCol}>
                        <TouchableOpacity style={styles.circle} onPress={() => this.props.onOptionChange(option, 0)}>
                            { selected === 0 && (<View style={styles.checkedCircle} />) }
                        </TouchableOpacity>
                    </View>
                    <View style={styles.gridCol}>
                        <TouchableOpacity style={styles.circle} onPress={() => this.props.onOptionChange(option, 1)}>
                            { selected === 1 && (<View style={styles.checkedCircle} />) }
                        </TouchableOpacity>
                    </View>
                    <View style={styles.gridCol}>
                        <TouchableOpacity style={styles.circle} onPress={() => this.props.onOptionChange(option, 2)}>
                            { selected === 2 && (<View style={styles.checkedCircle} />) }
                        </TouchableOpacity>
                    </View>
                </View>
            })
    }

    renderPreferences() {
        return <View style={styles.grid}>
            <View style={styles.gridRow}>
                <View style={styles.gridColWide}>
                </View>
                <View style={styles.gridCol}>
                    <Text style={Styles.xsmallSemiBold}>
                        IGNORE
                    </Text>
                </View>
                <View style={styles.gridCol}>
                    <Text style={Styles.xsmallSemiBold}>
                        LEARNING
                    </Text>
                </View>
                <View style={styles.gridCol}>
                    <Text style={Styles.xsmallSemiBold}>
                        FLUENT
                    </Text>
                </View>
            </View>
            <ScrollView>
                {this.renderPreferenceOptions()}
            </ScrollView>
        </View>
    }

    render(){
        return <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={Styles.mediumSemiBold}>
                    {this.props.title}
                </Text>
                <Text style={styles.subtitle}>
                    {this.props.subtitle}
                </Text>
            </View>
            <View style={styles.preferences}>
                {this.renderPreferences()}
            </View>
        </View>
    }
}

PreferenceSelector.proptypes = {
    options: PropTypes.arrayOf(PropTypes.object),
    learning: PropTypes.array,
    fluent: PropTypes.array,
    onOptionChange: PropTypes.func,
    title: PropTypes.string,
    subtitle: PropTypes.string 
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        backgroundColor: Colors.white,
        padding: 10
    },
    grid: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        paddingTop: 25,
        paddingHorizontal: 10,
        maxHeight: 300
    },
    gridRow: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray3,
        paddingVertical: 10,
        minHeight: 45
    },
    gridCol: {
        flexBasis: '23%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        paddingHorizontal: 5
    },
    gridColWide: {
        flexBasis: '31%',
        justifyContent: 'flex-start',
        alignContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        paddingRight: 10
    },
    gridColXWide: {
        flexBasis: '69%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignContent: 'center',
        alignItems: 'center',
        paddingRight: 10
    },
    segmentedControl: {
        backgroundColor: Colors.primary
    },
    circle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkedCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: Colors.primary,
    },
    subtitle: {
        ...Styles.smallText,
        color: Colors.gray1,
    }
})

export default PreferenceSelector