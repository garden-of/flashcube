import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { View, StyleSheet, ImageBackground } from 'react-native'
import { Button } from 'react-native-elements'

import * as actions from '../actions/user'

const mapStateToProps = state => ({
  ...state
})
  
const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch)
}

class ProfileScreen extends React.Component {
  
  constructor(props) {
    super(props)

    this.handleSignOut = this.handleSignOut.bind(this)
  }

  handleSignOut() {
    this.props.signOut()
    this.props.navigation.navigate('Auth')
  }

  render() {
      return <View>
          <ImageBackground source={require('../assets/images/background.png')} style={styles.imgBackground}>
            <View style={styles.container}>
              <Button 
                title='Sign Out'
                onPress={this.handleSignOut}
              />
            </View>
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
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)