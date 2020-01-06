import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { View, StyleSheet, ImageBackground } from 'react-native'

import * as actions from '../actions/onboarding'

const mapStateToProps = state => ({
    ...state
  })
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch)
  }

class OnboardingSets extends React.Component {
  render() {
    <View>
      <ImageBackground source={require('../assets/images/background.png')} style={styles.imgBackground}>

      </ImageBackground>
    </View>
  }
}

const styles = StyleSheet.create({
  imgBackground: {
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingSets)