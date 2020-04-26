import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as userActions from '../actions/user'
import * as towerActions from '../actions/tower'

import { View, FlatList, StyleSheet, ActivityIndicator, Modal, Text } from 'react-native'
import { Button } from 'react-native-elements'
import LanguagePicker from '../components/LanguagePicker/LanguagePicker'
import ListItem from '../components/ListItem/ListItem'

import Colors from '../constants/Colors'
import Styles from '../constants/Styles'

import PreferenceSelector from '../components/PreferenceSelector/PreferenceSelector'
import ProfileHeader from '../components/ProfileHeader/ProfileHeader'

const mapStateToProps = state => ({
  ...state
})
  
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    ...userActions,
    ...towerActions
  }, dispatch)
}

class HomeScreen extends React.Component {

  constructor(props) {
    super(props)

    this.handleBaseCategoryChange = this.handleBaseCategoryChange.bind(this)
    this.handleLearningCategoryChange = this.handleLearningCategoryChange.bind(this)
    this.handleFinalizeCategories = this.handleFinalizeCategories.bind(this)
    this.handleFinalizeSets = this.handleFinalizeSets.bind(this)
    this.renderMainFlow = this.renderMainFlow.bind(this)
    this.renderSetOnboardingFlow = this.renderSetOnboardingFlow.bind(this)
    this.renderSetListItem = this.renderSetListItem.bind(this)
    this.renderSubscriptionItem = this.renderSubscriptionItem.bind(this)
  }

  componentDidMount() {

    const { user } = this.props
    const { categories } = this.props.tower

    // check to see if user, user preferences, and categories have been fetched
    // TODO: this can probably be refactored
    if (!user.profile.fetched && !user.profile.fetching) {
      this.props.getUser()
        .then(() => this.props.getUserPreferences())
        .then(() => this.props.getCategories())
        .then(() => this.props.listTowers())
        .then(() => this.props.getUserSubscriptions())
    } else if (!user.profile.preferences.fetched && !user.profile.preferences.fetching) {
      this.props.getUserPreferences()
        .then(() => this.props.getCategories())
        .then(() => this.props.listTowers())
        .then(() => this.props.getUserSubscriptions())
    } else if (user.profile.fetched && !categories.fetched) {
      this.props.getCategories()
        .then(() => this.props.listTowers())
        .then(() => this.props.getUserSubscriptions())
    }
  }

  componentDidUpdate() {
    const { profile } = this.props.user

    if (profile.error) this.props.navigation.navigate('Signup')
  }

  handleBaseCategoryChange(selected) {
    const { preferences } = this.props.user.profile

    this.props.updateUserPreferences({
      id: preferences.id,
      baseCategory: selected,
      learningCategories: preferences.learningCategories,
      fluentCategories: preferences.fluentCategories
    })
  }

  handleLearningCategoryChange(selected, option) {
    const { preferences } = this.props.user.profile

    let learning = preferences.learningCategories
    let fluent = preferences.fluentCategories
    if (option === 0) {
      learning = learning.filter(item => item != selected.id)
      fluent = fluent.filter(item => item != selected.id)
    } else if (option === 1) {
      learning.push(selected.id)
      learning = [...new Set(learning)]
      fluent = fluent.filter(item => item != selected.id)
    } else if (option === 2) {
      fluent.push(selected.id)
      fluent = [...new Set(fluent)]
      learning = learning.filter(item => item != selected.id)
    }

    this.props.updateUserPreferences({
      id: preferences.id,
      baseCategory: preferences.baseCategory,
      learningCategories: learning,
      fluentCategories: fluent
    })
  }

  handleDeleteSubscription(subscriptionId) {
    this.props.deleteUserSubscription(subscriptionId)
      .then(() => this.props.getUserSubscriptions())
  }

  handleFinalizeCategories() {
    const { preferences } = this.props.user.profile
    const { towers } = this.props.tower

    this.props.updateUserPreferences({
      id: preferences.id,
      categoriesOnboarded: true
    }).then(() => {
      if (!towers.fetched) return this.props.listTowers()
    })
  }

  handleFinalizeSets() {
    const { preferences } = this.props.user.profile
    const { towers } = this.props.tower

    this.props.updateUserPreferences({
      id: preferences.id,
      setsOnboarded: true
    })
  }

  handleSetSubscription(setId) {

    const { profile } = this.props.user
    const { preferences } = profile

    const subscriptionCategories = [...new Set([
      ...preferences.learningCategories,
      ...preferences.fluentCategories
    ])]

    this.props.createUserSubscription(setId, profile.id, subscriptionCategories)
  }

  renderCategoryOnboardingFlow() {

    const { categories } = this.props.tower.categories
    const { preferences } = this.props.user.profile

    return <Modal
      animationType='slide'
      transparent={false}
      presentationStyle='pageSheet'
      visible={true}
    >
        <View style={Styles.modal}>
          <View style={{ flexBasis: '7%' }}>
            <Text style={{ ...Styles.display2, ...Styles.shadow, color: Colors.white }}>Tell us about yourself</Text>
          </View>
          <View style={{ ...styles.selector, flexBasis: '25%' }}>
            <LanguagePicker 
              title='What language do you speak?'
              options={categories}
              onOptionChange={this.handleBaseCategoryChange}
              selectedValue={preferences.baseCategory}
            />
          </View>
          <View style={{ ...styles.selector, flexBasis: '50%' }}>
            <PreferenceSelector
              title='What do you want to learn?'
              options={categories}
              learning={preferences.learningCategories}
              fluent={preferences.fluentCategories}
              onOptionChange={this.handleLearningCategoryChange}
            />
          </View>
          <View style={{ ...styles.selector, flexBasis: '18%' }}>
            <Button 
              title='Ready? Pick some sets to get started.'
              buttonStyle={Styles.transparentButtonStyle} 
              titleStyle={Styles.outlineButtonTextStyle} 
              containerStyle={styles.buttonContainer}
              onPress={this.handleFinalizeCategories}
            />
          </View>
        </View>
    </Modal>
  }

  renderMainFlow() {

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

    return <View style={styles.mainViewContainer}>
      <ProfileHeader
        name={profile.username}
        fluent={fluentCategories}
        learning={learningCategories}
        numSubscriptions={subscriptions.subscriptions.length}
        cubesMastered={0}
      />
      <View style={styles.subscribedTowerList}>
        <Text style={Styles.headline}>Your Towers</Text>
        <FlatList 
          keyExtractor={(item, index) => index.toString()}
          data={subscriptions.subscriptions}
          renderItem={this.renderSubscriptionItem}
        />
      </View>
    </View>
  }

  renderSetOnboardingFlow() {
    return <Modal
      animationType='slide'
      transparent={false}
      presentationStyle='pageSheet'
      visible={true}
    >
        <View style={Styles.modal}>
          <View style={{ flexBasis: '7%' }}>
            <Text style={{ ...Styles.display2, ...Styles.shadow, color: Colors.white }}>Pick some sets to learn</Text>
          </View>
          <View style={{ ...styles.selector, flexBasis: '75%', backgroundColor: Colors.white }}>
            <FlatList 
              keyExtractor={(item, index) => index.toString()}
              data={this.props.tower.towers.towers}
              renderItem={this.renderSetListItem}
            />
          </View>
          <View style={{ ...styles.selector, flexBasis: '18%' }}>
            <Button 
              title='All set? Start learning!'
              buttonStyle={Styles.transparentButtonStyle} 
              titleStyle={Styles.outlineButtonTextStyle} 
              containerStyle={styles.buttonContainer}
              onPress={this.handleFinalizeSets}
            />
          </View>
        </View>
    </Modal>
  }

  renderSubscriptionItem({ item }) {
    const { categories } = this.props.tower.categories
    const { towers } = this.props.tower.towers
    if (categories == undefined) return null
    if (towers == undefined) return null

    const mapDifficulty = () => {
      switch(item.difficulty) {
        case 'B':
          return 'Beginner'
        case 'I':
          return 'Intermediate'
        case 'E':
          return 'Expert'
        default:
          return 'Beginner'
      }
    }

    return <ListItem 
      languages={categories.filter(category => item.categories.includes(category.id)).map(category => category.category)}
      title={towers.filter(tower => item.tower == tower.id).map(tower => tower.name)}
      subtitle={`${towers.filter(tower => item.tower == tower.id).map(tower => tower.num_cubes)} cubes | ${mapDifficulty()}`}
      image={item.image}
      onTap={() => this.props.navigation.navigate('TowerDetailScreen', {tower: item.tower, subscribed: true })}
      rightItem={{
        type: 'chevron'
      }}
    />
  }

  renderSetListItem({ item }) {

    const { categories } = this.props.tower.categories
    const { subscriptions } = this.props.user.subscriptions

    if (categories == undefined) return null

    const mapDifficulty = () => {
      switch(item.difficulty) {
        case 'B':
          return 'Beginner'
        case 'I':
          return 'Intermediate'
        case 'E':
          return 'Expert'
        default:
          return 'Beginner'
      }
    }

    const isSubscribed = () => {
      if (subscriptions === undefined) return false
      else if (subscriptions.map(subscription => subscription.tower).includes(item.id)) return true
      return false
    }

    const onPress = (towerId) => {
      if (isSubscribed()) {
        return () => this.handleDeleteSubscription(subscriptions
          .find(subscription => subscription.tower === towerId))
      }
      return () => this.handleSetSubscription(towerId)
    }

    return <ListItem 
      languages={categories.filter(category => item.categories.includes(category.id)).map(category => category.category)}
      title={item.name}
      subtitle={`${item.num_cubes} cubes | ${mapDifficulty()}`}
      image={item.image}
      rightItem={{
        type: 'icon',
        onPress: onPress(item.id),
        checked: isSubscribed()
      }}
    />
  }

  renderLoader() {
    return <ActivityIndicator size='large'/>
  }

  renderHomeContent() {
    const { profile } = this.props.user
    const { categories, towers } = this.props.tower

    if (!profile || profile.fetching || !profile.fetched) return this.renderLoader()
    if (!profile.preferences || !profile.preferences.fetched) return this.renderLoader()

    const { categoriesOnboarded, setsOnboarded, onboardingSkipped } = profile.preferences
    if ((categoriesOnboarded && setsOnboarded) || onboardingSkipped) {
      return this.renderMainFlow()
    } else if (!categoriesOnboarded) {
      if (!categories.fetched) return this.renderLoader()
      return this.renderCategoryOnboardingFlow()
    } else if (!setsOnboarded && towers.fetched) {
      return this.renderSetOnboardingFlow()
    }
    else return this.renderLoader()
  }

  render() {
    return <View style={styles.container}>
      {this.renderHomeContent()}
    </View>
    }
}

const styles = StyleSheet.create({
  imgBackground: {
    width: '100%',
    height: '100%',
  },
  container: {
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignContent: 'center'
  },
  mainViewContainer: {
    paddingTop: 70,
    flex: 1,
    width: '100%'
  },
  loaderContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.40)',
  },
  selector: {
    ...Styles.shadow,
    marginBottom: 10
  },
  buttonContainer: {
    ...Styles.buttonContainer,
    marginHorizontal: 25
  },
  subscribedTowerList: {
    paddingTop: 20,
    paddingHorizontal: 10
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)