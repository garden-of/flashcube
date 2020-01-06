import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../actions/user'

import { StyleSheet, View } from 'react-native'

import Colors from '../constants/Colors'

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch)
}

class AuthLoading extends React.Component {
    
    componentDidMount() {
        this._bootstrapAsync()
    }
    
    _bootstrapAsync = async () => {
        console.log(this.props)
        let userToken = false
        this.props.navigation.navigate(userToken ? 'App' : 'Signup');
    }

    render() {
        return (
            <View style={styles.container}>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    alignItems: "center",
    padding: 10
  },
  cardStyle: {
    maxHeight: 100
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading)