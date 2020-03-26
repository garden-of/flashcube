import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as userActions from '../actions/user'
import * as towerActions from '../actions/tower'

import { View, ScrollView, StyleSheet, Button, Text} from 'react-native'

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

class TowerDetailScreen extends React.Component {

  constructor(props) {
    super(props)

    const { towers } = this.props.tower.towers
    const { navigation } = this.props

    this.state = {
      tower: towers.filter(tower => navigation.getParam('tower', 0) == tower.id)[0]
    }

    this.renderTowerCategories = this.renderTowerCategories.bind(this)
  }

  renderTowerCategories() {
    const { categories } = this.props.tower.categories
    const { subscriptions } = this.props.user.subscriptions
    
    // if this is a subscribed tower, only show the categories the user is subscribed to
    if (subscriptions.map(sub => sub.tower).includes(this.state.tower.id)) {
      let subscription = subscriptions.filter(sub => sub.tower == this.state.tower.id)[0]
      let category_string = categories.filter(category => subscription.categories.includes(category.id))
        .map((category, index) => category.category)
      return <Text style={styles.categoryLabelHighlighted}>
        {category_string.join(', ')}
      </Text>
    }

    // if the user isnt subscribed, show all the categories
    return <Text style={styles.categoryLabelHighlighted}>
      {category_string.map(category => category.category).join(', ')}
    </Text>


  }

  render() {

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={Styles.titleStyle}>
          <Text style={Styles.display2}>{this.state.tower.name}</Text>
        </View>
        <View style={styles.categoryManager}>
          <View style={styles.categories}>{this.renderTowerCategories()}</View>
          <View style={styles.categoryEdit}></View>
        </View>
        <View style={styles.progress}>
          <Text style={Styles.mediumSemiBold}>the progress bar will go here</Text>
        </View>
        <View style={styles.learnActions}>
          <Button
            title='FLASH'
          />
          <Button
            title='WRITE'
          />
        </View>
        <View style={styles.cubes}>
          <Text>a list of all the cubes</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: Styles.containerPadding
  },
  categoryManager: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  categories: {
    ...Styles.subtitleStyle,
    display: 'flex',
    flexDirection: 'row',
    flexBasis: '80%'
  },
  categoryEdit: {
    flexBasis: '20%'
  },
  progress: {
    width: '100%'
  },
  learnActions: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row'
  },
  cubes: {
    width: '100%'
  },
  categoryLabelHighlighted: {
    ...Styles.xxsmallText,
    textTransform: 'uppercase',
    color: Colors.gray1,
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TowerDetailScreen)