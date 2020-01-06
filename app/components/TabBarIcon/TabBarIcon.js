import React from 'react'

import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'

import Colors from '../../constants/Colors'

export default class TabBarIcon extends React.Component {
  
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    Font.loadAsync({
      'ionicons': require('../../assets/fonts/ionicons.ttf')
    })
  }

  render() {
    return (
      <Ionicons
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? Colors.primary : Colors.gray3}
      />
    )
  }
}
