import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as userActions from '../actions/user'
import * as towerActions from '../actions/tower'

import { View, ScrollView, FlatList, StyleSheet, ImageBackground, ActivityIndicator, Modal, Text } from 'react-native'
import { Button } from 'react-native-elements'
import LanguagePicker from '../components/LanguagePicker/LanguagePicker'
import ListItem from '../components/ListItem/ListItem'

import Colors from '../constants/Colors'
import Styles from '../constants/Styles'
import PreferenceSelector from '../components/PreferenceSelector/PreferenceSelector'

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
    this.renderSetOnboardingFlow = this.renderSetOnboardingFlow.bind(this)
    this.renderSetListItem = this.renderSetListItem.bind(this)
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

  renderMainFlow() {

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
      presentationStyle='fullScreen'
      visible={true}
    >
      <ImageBackground source={require('../assets/images/background.png')} style={styles.imgBackground}>
        <View style={Styles.modal}>
          <View style={{ flexBasis: '7%' }}>
            <Text style={{ ...Styles.display2, ...Styles.shadow, color: Colors.white }}>Tell us about yourself</Text>
          </View>
          <View style={{ ...styles.selector, flexBasis: '25%' }}>
            <LanguagePicker 
              title='What language do you know best?'
              subtitle='This will be your base language.'
              options={categories}
              onOptionChange={this.handleBaseCategoryChange}
              selectedValue={preferences.baseCategory}
            />
          </View>
          <View style={{ ...styles.selector, flexBasis: '50%' }}>
            <PreferenceSelector
              title='What do you want to learn?'
              subtitle='This is the content you will see.'
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
      </ImageBackground>
    </Modal>
  }

  renderMainFlow() {
    return <View>
      
    </View>
  }

  renderSetOnboardingFlow() {
    return <Modal
      animationType='slide'
      transparent={false}
      presentationStyle='fullScreen'
      visible={true}
    >
      <ImageBackground source={require('../assets/images/background.png')} style={styles.imgBackground}>
        <View style={Styles.modal}>
          <View style={{ flexBasis: '7%' }}>
            <Text style={{ ...Styles.display2, ...Styles.shadow, color: Colors.white }}>Pick some sets to learn</Text>
          </View>
          <View style={{ ...styles.selector, flexBasis: '75%' }}>
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
      </ImageBackground>
    </Modal>
  }

  renderSetListItem({ item }) {

    const { categories } = this.props.tower.categories
    const { subscriptions } = this.props.user.subscriptions

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
    return <View style={styles.loaderContainer}>
      <ActivityIndicator color={Colors.black} size='large'/>
    </View>
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
    return <View>
        <ImageBackground source={require('../assets/images/background.png')} style={styles.imgBackground}>
          <View style={styles.container}>
            {this.renderHomeContent()}
          </View>
        </ImageBackground>
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
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)