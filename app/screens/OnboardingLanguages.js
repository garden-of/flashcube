import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { View, StyleSheet, ImageBackground, Text} from 'react-native'

import * as actions from '../actions/onboarding'

const mapStateToProps = state => ({
    ...state
  })
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch)
  }

class OnboardingLanguages extends React.Component {
  render() {
    return <View>
      <ImageBackground source={require('../assets/images/background.png')} style={styles.imgBackground}>
        <Text>HERE WE ARE</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingLanguages)