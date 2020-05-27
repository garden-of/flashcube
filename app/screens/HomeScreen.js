import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as configActions from '../actions/config'
import * as userActions from '../actions/user'
import * as towerActions from '../actions/tower'

import { View, FlatList, StyleSheet, ActivityIndicator, Modal, Text, Dimensions, Switch } from 'react-native'
import { Button, ListItem, SearchBar } from 'react-native-elements'
import Carousel from 'react-native-snap-carousel'
import LanguagePicker from '../components/LanguagePicker/LanguagePicker'
import FCListItem from '../components/ListItem/ListItem'

import i18n, { cleanLocale } from '../localization/translations'

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
    ...towerActions,
    ...configActions,
  }, dispatch)
}

class HomeScreen extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      onboardingCategories: [],
      onboardingSets: [],
      categorySearch: ''
    }

    this.handleBaseCategoryChange = this.handleBaseCategoryChange.bind(this)
    this.handleLearningCategoryChange = this.handleLearningCategoryChange.bind(this)
    this.handleFinalizeCategories = this.handleFinalizeCategories.bind(this)
    this.handleFinalizeSets = this.handleFinalizeSets.bind(this)
    this.renderMainFlow = this.renderMainFlow.bind(this)
    this.renderSetOnboardingFlow = this.renderSetOnboardingFlow.bind(this)
    this.renderSetListItem = this.renderSetListItem.bind(this)
    this.renderSubscriptionItem = this.renderSubscriptionItem.bind(this)
    this.renderCarosel = this.renderCarosel.bind(this)
    this.renderCaroselCard = this.renderCaroselCard.bind(this)
    this.renderCategorySelector = this.renderCategorySelector.bind(this)
  }

  componentDidMount() {

    const { user } = this.props
    const { categories } = this.props.tower

    // check to see if user, user preferences, and categories have been fetched
    // TODO: this can probably be refactored
    if (!user.profile.fetched && !user.profile.fetching) {
      this.props.getUser()
        .then(() => this.props.getDefaultList())
        .then(() => this.props.getUserPreferences())
        .then(() => this.props.getCategories())
        .then(() => this.props.listTowers())
        .then(() => this.props.getUserSubscriptions())
        .then(() => this.props.getUserSubscriptions())
        .then(() => this.props.getLocales())
    } else if (!user.profile.preferences.fetched && !user.profile.preferences.fetching) {
      this.props.getUserPreferences()
        .then(() => this.props.getDefaultList())
        .then(() => this.props.getCategories())
        .then(() => this.props.listTowers())
        .then(() => this.props.getUserSubscriptions())
        .then(() => this.props.getLocales())
    } else if (user.profile.fetched && !categories.fetched) {
      this.props.getCategories()
        .then(() => this.props.getDefaultList())
        .then(() => this.props.listTowers())
        .then(() => this.props.getUserSubscriptions())
        .then(() => this.props.getLocales())
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

  handleLearningCategoryChange(category) {
    if (this.state.onboardingCategories.includes(category)) {
      this.setState({
        onboardingCategories: this.state.onboardingCategories.filter( c => c !== category )
      })
    } else {
      this.setState({
        onboardingCategories: [...this.state.onboardingCategories, category]
      })
    }
  }

  handleDeleteSubscription(subscriptionId) {
    this.props.deleteUserSubscription(subscriptionId)
      .then(() => this.props.getUserSubscriptions())
  }

  handleFinalizeCategories() {
    const { preferences } = this.props.user.profile
    const { towers } = this.props.tower
    const { locales } = this.props.config.locales

    let myLocale = locales.find( l => l.locale == cleanLocale )
    
    // default to english
    if (!myLocale) myLocale = { language: 3 }  

    this.props.updateUserPreferences({
      id: preferences.id,
      categoriesOnboarded: true,
      learningCategories: this.state.onboardingCategories.map(c => c.id),
      baseCategory: myLocale.language,
      fluentCategories: [myLocale.language]
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

  renderCategorySelector(item) {
    const category = item.item
    return <ListItem 
      containerStyle={Styles.listItemContainer}
      title={category.category}
      titleStyle={Styles.regularText}
      switch={{
        trackColor: {true: Colors.primary},
        value: this.state.onboardingCategories.includes(category),
        onChange: () => this.handleLearningCategoryChange(category)
      }}
    />
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
        <View style={Styles.modal}>
          <Text style={Styles.mediumSemiBold}>{i18n.t('home.select_languages')}</Text>
          <Text style={[Styles.xsmallTagCaps, Styles.verticalPad]}>
            {this.state.onboardingCategories.map( c => c.category).join(', ')}
          </Text>
          <SearchBar 
            platform='ios'
            placeholder='search'
            containerStyle={Styles.searchBarContainer}
            cancelButtonProps={{
              color: Colors.primary
            }}
            value={this.state.categorySearch}
            onChangeText={t => this.setState({categorySearch: t})}
          />
          <FlatList 
            keyExtractor={(item, index) => index.toString()}
            data={categories.filter( c => c.category.toLowerCase().includes(this.state.categorySearch.toLowerCase()))}
            renderItem={this.renderCategorySelector}
          />
          <Button 
            title='Ready'
            buttonStyle={Styles.buttonStyle} 
            titleStyle={Styles.buttonTextStyle} 
            containerStyle={Styles.buttonContainerStyle}
            onPress={this.handleFinalizeCategories}
            disabled={this.state.onboardingCategories.length > 0 ? false : true}
          />
        </View>
    </Modal>
  }

  renderCaroselCard({item, index}) {
    return <View style={styles.caroselCardInner} key={index}>
        <Text style={[Styles.mediumSemiBold, {color: Colors.white}]}>{item.title}</Text>
        <Text style={[Styles.mediumText, {color: Colors.gray6}]}>{item.subtitle}</Text>
        <Button 
          title={item.cta}
          onPress={() => console.log('pressed')}
          buttonStyle={Styles.invertedButtonStyle}
          titleStyle={Styles.invertedButtonTextStyle}
        />
      </View>
  }

  renderCarosel() {
    const { defaultList } = this.props.user

    if (defaultList.fetching && !defaultList.fetched) return this.renderLoader()
    if (!defaultList.fetching && !defaultList.fetched && defaultList.error) return null
    if (!defaultList.fetching && !defaultList.fetched) return this.renderLoader()

    return <Carousel 
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width-40}
        activeSlideAlignment={'start'}
        renderItem={this.renderCaroselCard}
        slideStyle={Styles.caroselCard}
        data={[
          {
            title: 'Test Your Progress',
            subtitle: 'Take a short daily quiz to see how what you\'ve learned',
            cta: 'Study Today\'s Set'
          },
          { 
            title: `Review Your List`,
            subtitle: `You're currently learning 10 cards.`,
            cta: 'Review All Your Cards'
          },
        ]}
      />
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

    const avatar = profile.social ? profile.social.photoUrl : null

    return <View style={styles.mainViewContainer}>
      <ProfileHeader
        name={profile.username}
        fluent={fluentCategories}
        learning={learningCategories}
        numSubscriptions={subscriptions.subscriptions.length}
        cubesMastered={0}
        avatarUri={avatar}
      />
      <View style={styles.myList}>
        {this.renderCarosel()}
      </View>
      <View style={styles.subscribedTowerList}>
  <Text style={Styles.headline}>{i18n.t('home.your_towers')}</Text>
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
      presentationStyle='fullScreen'
      visible={true}
    >
        <View style={Styles.modal}>
            <Text style={Styles.mediumSemiBold}>{i18n.t('home.select_sets')}</Text>
            <FlatList 
              keyExtractor={(item, index) => index.toString()}
              data={this.props.tower.towers.towers}
              renderItem={this.renderSetListItem}
            />
            <Button 
              title='Start Learning'
              buttonStyle={Styles.buttonStyle} 
              titleStyle={Styles.buttonTextStyle} 
              containerStyle={Styles.buttonContainerStyle}
              onPress={this.handleFinalizeSets}
              disabled={this.props.user.subscriptions.subscriptions.length == 0}
            />
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

    return <FCListItem 
      languages={categories.filter(category => item.categories.includes(category.id)).map(category => category.category)}
      title={towers.filter(tower => item.tower == tower.id).map(tower => tower.name)}
      subtitle={`${towers.filter(tower => item.tower == tower.id).map(tower => tower.num_cubes)} cubes | ${mapDifficulty()}`}
      image={towers.filter(tower => item.tower == tower.id).map(tower => tower.image)[0]}
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

    return <FCListItem 
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
  myList: {
    paddingVertical: 20,
    paddingHorizontal: 10
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
  },
  caroselCardInner: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)