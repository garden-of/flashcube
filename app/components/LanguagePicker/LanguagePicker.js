import React from 'react'
import PropTypes from 'prop-types'

import { View, StyleSheet, Text, Picker } from 'react-native'

import Colors from '../../constants/Colors'
import Styles from '../../constants/Styles'

class LanguagePicker extends React.Component {

    constructor(props) {
        super(props)
        
        this.state = {
            selectedLanguage: null
        }
    }

    renderPickerItems() {
        return this.props.options.map((option, index) => <Picker.Item key={index} label={option.category} value={option.id} />)
    }

    render(){

        const defaultValue = this.props.options.find(element => element.category === 'English')

        return <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={Styles.mediumSemiBold}>
                    {this.props.title}
                </Text>
                <Text style={styles.subtitle}>
                    {this.props.subtitle}
                </Text>
            </View>
            <View style={styles.pickerContainer}>
                <Picker 
                    selectedValue={this.props.selectedValue ? this.props.selectedValue : defaultValue.id}
                    onValueChange={(itemValue, itemIndex) => this.props.onOptionChange(itemValue)}
                    itemStyle={styles.pickerItem}>
                    {this.renderPickerItems()}
                </Picker>
            </View>
        </View>
    }
}

LanguagePicker.proptypes = {
    options: PropTypes.arrayOf(PropTypes.object),
    selectedValue: PropTypes.number,
    onOptionChange: PropTypes.func,
    title: PropTypes.string,
    subtitle: PropTypes.string 
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        maxHeight: 200,
        flexDirection: 'column',
        backgroundColor: Colors.white,
        paddingHorizontal: 10,
        paddingTop: 10
    },
    textContainer: {
        margin: 0,
        padding: 10,
        flexBasis: '25%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'baseline',
        justifyContent: 'center',
        paddingRight: 30
    },
    pickerContainer: {
        margin: 0,
        flexBasis: '75%',
        display: 'flex',
        paddingHorizontal: 10
    },
    pickerItem: {
        height: '100%',
        ...Styles.regularText,
        paddingVertical: 0
    },
    subtitle: {
        ...Styles.smallText,
        color: Colors.gray1,
    }
})

export default LanguagePicker