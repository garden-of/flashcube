import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { View, StyleSheet, ImageBackground } from 'react-native'
import { Button } from 'react-native-elements'

import ProfileHeader from '../components/ProfileHeader/ProfileHeader'

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

  renderHeader() {
    const { profile, subscriptions } = this.props.user
    const { categories } = this.props.tower.categories

    if (categories == undefined) return null
    if (subscriptions.subscriptions == undefined) return null

    const fluentCategories = categories
      .filter(category => profile.preferences.fluentCategories.includes(category.id))
      .map(category => category.category)

    const learningCategories = categories
      .filter(category => profile.preferences.learningCategories.includes(category.id))
      .map(category => category.category)

    return <View style={styles.profileSummary}>
      <ProfileHeader
        name={profile.username}
        fluent={fluentCategories}
        learning={learningCategories}
        numSubscriptions={subscriptions.subscriptions.length}
        cubesMastered={0}
      />
    </View>
  }

  render() {
      return <View>
        <View style={styles.container}>
          {this.renderHeader()}
          <View style={styles.signOut}>
            <Button 
              title='Sign Out'
              onPress={this.handleSignOut}
            />
          </View>
        </View>
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
    paddingVertical:70,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center'
  },
  profileSummary: {
    flexBasis: '80%',
  },
  signOut: {
    flexBasis: '20%'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)