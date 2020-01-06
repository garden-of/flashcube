import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as userActions from '../actions/user'
import * as towerActions from '../actions/tower'

import { View, ScrollView, StyleSheet, ImageBackground, ActivityIndicator, Modal, Text } from 'react-native'
import LanguagePicker from '../components/LanguagePicker/LanguagePicker'

import Colors from '../constants/Colors'
import Styles from '../constants/Styles'
import { Ionicons } from '@expo/vector-icons'
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

    this.handleLearningCategoryChange = this.handleLearningCategoryChange.bind(this)
  }

  componentDidMount() {

    // check to see if user+preferences have been fetched
    if (!this.props.user.profile.fetched && !this.props.user.profile.fetching) {
      this.props.getUser().then(() => this.props.getUserPreferences()).then(() => this.props.getCategories())
    } else if (!this.props.user.profile.preferences.fetched && !this.props.user.profile.preferences.fetching) {
      this.props.getUserPreferences().then(() => this.props.getCategories())
    }
  }

  renderMainFlow() {

  }

  handleBaseCategoryChange(selected) {

  }

  handleLearningCategoryChange(option, selected) {
    const { preferences } = this.props.user.profile
    
    let learning = preferences.learningCategories
    let fluent = preferences.fluentCategories
    if (option == 0) {
      learning = learning.filter(item => item.id != selected.id)
      fluent = fluent.filter(item => item.id != selected.id)
    } else if (option == 1) {
      learning.push(selected.id)
      learning = [...new Set(learning)]
      fluent = fluent.filter(item => item.id != selected.id)
    } else if (option == 2) {
      fluent.push(selected.id)
      fluent = [...new Set(fluent)]
      learning = learning.filter(item => item.id != selected.id)
    }
    
    this.props.updateUserPreferences({
      id: preferences.id,
      baseCategory: preferences.baseCategory,
      learningCategories: learning,
      fluentCategories: fluent
    })
  }

  renderOnboardingFlow() {

    const { categories } = this.props.tower.categories
    const { preferences } = this.props.user.profile

    return <Modal
      animationType='slide'
      transparent={false}
      presentationStyle='pageSheet'
      visible={true}
    >
      <ImageBackground source={require('../assets/images/background.png')} style={styles.imgBackground}>
        <View style={Styles.modal}>
          <Text style={{ ...Styles.display2, color: Colors.white }}>Tell us about yourself</Text>
        </View>
        <ScrollView>
          <View style={styles.selector}>
            <LanguagePicker 
              title='What language do you know best?'
              subtitle='This will be your base language.'
              options={categories}
            />
          </View>
          <View style={styles.selector}>
            <PreferenceSelector
              title='What do you want to learn?'
              subtitle='This is the content you will see.'
              options={[
                ...categories.map(category => ({...category, selector: 0})),
                ...preferences.learningCategories.map(category => ({...category, selector: 1})),
                ...preferences.fluentCategories.map(category => ({...category, selector: 2})),
              ]}
              onOptionChange={this.handleLearningCategoryChange}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </Modal>
  }

  renderLoader() {
    return <View style={styles.loaderContainer}>
      <ActivityIndicator color={Colors.black} size='large'/>
    </View>
  }

  renderHomeContent() {
    const { profile } = this.props.user
    const { categories } = this.props.tower

    if (!profile || profile.fetching || !profile.fetched) return this.renderLoader()
    if (!profile.preferences || profile.preferences.fetching || !profile.preferences.fetched) return this.renderLoader()

    const { onboarded, onboardingSkipped } = profile.preferences
    if (onboarded || onboardingSkipped) return this.renderMainFlow()
    else if (!onboarded && !onboardingSkipped) {
      if (categories.fetching) return this.renderLoader()
      else if (!categories.fetching && categories.fetched) return this.renderOnboardingFlow()
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
    height: '100%'
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
    marginBottom: 25
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)