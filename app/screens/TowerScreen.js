import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as userActions from '../actions/user'
import * as towerActions from '../actions/tower'

import { View, StyleSheet, Text, FlatList } from 'react-native'
import { ActivityIndicator } from 'react-native-elements'

import ListItem from '../components/ListItem/ListItem'

import Styles from '../constants/Styles'
import Colors from '../constants/Colors'

const mapStateToProps = state => ({
  ...state
})
  
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    ...userActions,
    ...towerActions
  }, dispatch)
}

class TowerScreen extends React.Component {
  
  constructor(props) {
    super(props)

    this.getAllTowersData = this.getAllTowersData.bind(this)
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

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Towers'
    }
  }

  getAllTowersData() {
    const { subscriptions } = this.props.user.subscriptions
    const { towers } = this.props.tower.towers

    const subscribed_sets = subscriptions.map(sub => sub.tower)

    return towers
      .filter( t => !subscribed_sets.includes(t.id))
      .map( t => ({ tower: t.id, categories: t.categories }))
  }

  renderSubscriptionItem({ item }, subscribed) {
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
      onTap={() => this.props.navigation.navigate('TowerDetailScreen', {tower: item.tower, subscribed })}
      rightItem={{
        type: 'chevron'
      }}
    />
  }

  renderLoader() {
    return <ActivityIndicator />
  }

  render () {
    
    const { profile, subscriptions } = this.props.user
    const { categories } = this.props.tower.categories

    if (!profile || profile.fetching || !profile.fetched) return this.renderLoader()
    if (!profile.preferences || !profile.preferences.fetched) return this.renderLoader()

    if (categories == undefined) return null
    if (subscriptions.subscriptions == undefined) return null

    const fluentCategories = categories
      .filter(category => profile.preferences.fluentCategories.includes(category.id))
      .map(category => category.category)

    const learningCategories = categories
      .filter(category => profile.preferences.learningCategories.includes(category.id))
      .map(category => category.category)

    return <View style={styles.container}>
      <View style={styles.subscribedTowerList}>
        <Text style={Styles.headline}>Your Towers</Text>
        <FlatList 
          keyExtractor={(item, index) => index.toString()}
          data={subscriptions.subscriptions}
          renderItem={item => this.renderSubscriptionItem(item, true)}
        />
      </View>
      <View style={styles.newTowerList}>
        <Text style={Styles.headline}>Find New Towers</Text>
        <FlatList 
          keyExtractor={(item, index) => index.toString()}
          data={this.getAllTowersData()}
          renderItem={item => this.renderSubscriptionItem(item, false)}
        />
      </View>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  newTowerList: {
    marginTop: 20
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TowerScreen)