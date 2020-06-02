import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as Analytics from 'expo-firebase-analytics'

import { View, StyleSheet, Text, Modal} from 'react-native'
import { Button, ListItem, Avatar, Input } from 'react-native-elements'

import ProfileHeader from '../components/ProfileHeader/ProfileHeader'

import * as actions from '../actions/user'

import Styles from '../constants/Styles'
import Colors from '../constants/Colors'

const mapStateToProps = state => ({
  ...state
})
  
const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch)
}

class ProfileScreen extends React.Component {
  
  constructor(props) {
    super(props)

    this.handleUpdateAnalytics = this.handleUpdateAnalytics.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
    this.renderSignout = this.renderSignout.bind(this)
    this.renderPrivacySettings = this.renderPrivacySettings.bind(this)
  }

  getCategoryNameFromId(categoryId) {
    let { categories } = this.props.tower.categories
    return categories.find(c => c.id == categoryId).category
  }

  handleUpdateAnalytics() {
    const { preferences } = this.props.user.profile

    Analytics.setAnalyticsCollectionEnabled(!preferences.analytics)
    this.props.updateUserPreferences({
      id: preferences.id,
      analytics: !preferences.analytics
    })
  }

  handleSignOut() {
    this.props.signOut()
    this.props.navigation.navigate('Auth')
  }

  renderHeader(key) {
    const { profile, subscriptions } = this.props.user
    const { categories } = this.props.tower.categories

    if (categories == undefined) return null
    if (subscriptions.subscriptions == undefined) return null

    const avatar = profile.social ? profile.social.photoUrl : null

    const fluentCategories = categories
      .filter(category => profile.preferences.fluentCategories.includes(category.id))
      .map(category => category.category)

    const learningCategories = categories
      .filter(category => profile.preferences.learningCategories.includes(category.id))
      .map(category => category.category)

      
    return <View key={key} style={[styles.section, styles.header]}>
      <View>
        <Avatar
          rounded
          accessory={{
            type: 'ionicons',
            name: 'edit',
            color: Colors.gray5,
          }}
          underlayColor={Colors.red}
          showAccessory={true}
          title={`${profile.first_name.substring(0,1)}${profile.last_name.substring(0,1)}`}
          size={'large'}
          source={{
            uri: avatar
          }}
          overlayContainerStyle={Styles.avatarStyle}
        />
      </View>
      <View style={Styles.verticalPad}>
        <Text style={Styles.regularSemiBold}>{profile.username}</Text>
      </View>

    </View>
  }

  renderLearningPrefs(key) {

    const { preferences } = this.props.user.profile

    return <View key={key} style={styles.section}>
      <ListItem 
        title={'Base language'}
        titleStyle={Styles.regularText}
        rightTitleStyle={{...Styles.smallText, ...styles.rightTitleTextStyle}}
        rightTitle={this.getCategoryNameFromId(preferences.baseCategory)}
        onPress={() => this.props.navigation.navigate('ProfileEdit', {
          module: 'preferences',
          field: 'baseCategory',
          input: 'picker'
        })}
        chevron
      />
      <ListItem 
        title={'Learning'}
        titleStyle={Styles.regularText}
        rightTitleStyle={{...Styles.smallText, ...styles.rightTitleTextStyle}}
        rightTitle={preferences.learningCategories.map( c => this.getCategoryNameFromId(c)).join(', ')}
        chevron
      />
    </View>
  }

  renderContactDetails(key) {
    const { profile } = this.props.user
    
    return <View key={key} style={styles.section}>
      <ListItem 
        title={'Email'}
        titleStyle={Styles.regularText}
        rightTitleStyle={{...Styles.smallText, ...styles.rightTitleTextStyle}}
        rightTitle={profile.email}
        onPress={() => this.props.navigation.navigate('ProfileEdit', {
          module: 'profile',
          field: 'email'
        })}
        chevron
      />
      <ListItem 
        title={'Username'}
        titleStyle={Styles.regularText}
        rightTitleStyle={{...Styles.smallText, ...styles.rightTitleTextStyle}}
        rightTitle={profile.username}
        onPress={() => this.props.navigation.navigate('ProfileEdit', {
          module: 'profile',
          field: 'username'
        })}
        chevron
      />
      <ListItem 
        title={'First name'}
        titleStyle={Styles.regularText}
        rightTitleStyle={{...Styles.smallText, ...styles.rightTitleTextStyle}}
        rightTitle={profile.first_name}
        onPress={() => this.props.navigation.navigate('ProfileEdit', {
          module: 'profile',
          field: 'first_name'
        })}
        chevron
      />
      <ListItem 
        title={'Last name'}
        titleStyle={Styles.regularText}
        rightTitleStyle={{...Styles.smallText, ...styles.rightTitleTextStyle}}
        rightTitle={profile.last_name}
        onPress={() => this.props.navigation.navigate('ProfileEdit', {
          module: 'profile',
          field: 'last_name'
        })}
        chevron
      />
    </View>
  }

  renderPrivacySettings(key) {

    const { preferences } = this.props.user.profile

    return <View key={key} style={styles.section}>
      <ListItem 
        title={'Push notifications'}
        titleStyle={Styles.regularText}
        rightTitleStyle={{...Styles.smallText, ...styles.rightTitleTextStyle}}
        switch={{
          value: preferences.push_notifications,
          trackColor: {
            true: Colors.primary
          },
          onChange: () => this.props.updateUserPreferences({
            id: preferences.id,
            push_notifications: !preferences.push_notifications
          })
        }}
      />
      <ListItem 
        title={'Analytics'}
        titleStyle={Styles.regularText}
        rightTitleStyle={{...Styles.smallText, ...styles.rightTitleTextStyle}}
        switch={{
          value: preferences.analytics,
          trackColor: {
            true: Colors.primary
          },
          onChange: this.handleUpdateAnalytics
        }}
      />
    </View>
  }

  renderSignout(key) {
    return <View key={key} style={styles.section}>
      <ListItem 
        title={'Log Out'}
        titleStyle={Styles.regularText}
        rightTitleStyle={{...Styles.smallText, ...styles.rightTitleTextStyle}}
        onPress={this.handleSignOut}
        chevron
      />
    </View>
  }

  render() {
      return <View style={styles.container}>
        {[
          this.renderHeader(1),
          this.renderLearningPrefs(2), 
          this.renderContactDetails(3),
          this.renderPrivacySettings(4),
          this.renderSignout(5),
        ]}
      </View>
  }
}

const styles = StyleSheet.create({
  accessoryIcon: {
    backgroundColor: Colors.gray5,
    borderColor: Colors.gray5
  },
  container: {
    display: 'flex',
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: Colors.gray5
  },
  header: {
    paddingTop: 70,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  invertedButtonStyle: {
    backgroundColor: Colors.gray6
  },
  rightTitleStyle: {
    flex: 1,
    flexBasis: '50%'
  },
  rightTitleTextStyle: {
    flex: 1,
    color: Colors.primary,
    width: 200,
    textAlign: 'right'
  },  
  section: {
    marginBottom: 15,
    backgroundColor: Colors.white,
    borderTopColor: Colors.gray4,
    borderBottomColor: Colors.gray4,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)