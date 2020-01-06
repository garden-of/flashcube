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
                    selectedid={this.state.selectedLanguage}
                    onidChange={(itemid, itemIndex) => this.setState({selectedLanguage: itemid})}
                    itemStyle={styles.pickerItem}>
                    {this.renderPickerItems()}
                </Picker>
            </View>
        </View>
    }
}

LanguagePicker.proptypes = {

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
        ...Styles.xsmallText,
        color: Colors.gray1,
    }
})

export default LanguagePicker