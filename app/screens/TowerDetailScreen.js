import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as userActions from '../actions/user'
import * as towerActions from '../actions/tower'

import { View, ScrollView, StyleSheet, Text, ActivityIndicator } from 'react-native'
import { Button, Icon, SearchBar, List, ListItem } from 'react-native-elements'

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
      tower: towers.filter(tower => navigation.getParam('tower', 0) == tower.id)[0],
      cubeSearch: '',
      activeCube: null
    }

    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleWriteLearnAction = this.handleWriteLearnAction.bind(this)
    this.fetchCubes = this.fetchCubes.bind(this)
    this.getCategoryNameFromId = this.getCategoryNameFromId.bind(this)
    this.isSubscribedFace = this.isSubscribedFace.bind(this)
    this.renderTowerCategories = this.renderTowerCategories.bind(this)
    this.renderCubeList = this.renderCubeList.bind(this)
  }

  componentDidUpdate(prevProps) {
    const { towers } = this.props.tower.towers
    const newTower = this.props.navigation.getParam('tower')
    if (newTower != this.state.tower.id) {
      this.setState({tower: towers.filter(tower => newTower == tower.id)[0]})
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: <Button 
            icon={
              <Icon
              name='ios-options'
              type='ionicon'
              size={25}
              color={Colors.primary}
              />
            }
            buttonStyle={Styles.iconButtonStyle} 
            titleStyle={Styles.iconButtonTextStyle} 
            containerStyle={styles.iconbuttonContainer}
        />
    }
  }

  cubeMatchesSearch(cubeName) {
    return cubeName.toLowerCase().includes(this.state.cubeSearch.toLowerCase())
  }

  handleSearchChange(text) {
    this.setState({cubeSearch: text})
  }

  handleWriteLearnAction() {
    this.props.navigation.navigate('WriteScreen', {tower: this.state.tower })
  }

  fetchCubes(towerId) {
    this.props.getTowerCubes(this.state.tower.id)
  }

  getCategoryNameFromId(categoryId) {
    let { categories } = this.props.tower.categories
    return categories.find(c => c.id == categoryId).category
  }

  isSubscribedFace(categoryId) {
    const { learningCategories } = this.props.user.profile.preferences

    return learningCategories.includes(categoryId)
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

  renderLearnActions() {
    return [
      <View style={styles.learnActionsAction} key={1}>
        <Button
          icon={
            <Icon
            name='ios-cube'
            type='ionicon'
            size={60}
            color={Colors.white}
            />
          }
          title='FLASH'
          buttonStyle={styles.learnActionButton} 
          titleStyle={styles.learnActionTitle} 
          containerStyle={styles.learnActionContainerFlash}
          iconContainerStyle={styles.learnActionIconContainer}
          key={1}
        />
      </View>,
      <View style={styles.learnActionsAction} key={2}>
        <Button
          icon={
            <Icon
              name='ios-create'
              type='ionicon'
              size={60}
              color={Colors.white}
            />
          }
          title='WRITE'
          buttonStyle={styles.learnActionButton} 
          titleStyle={styles.learnActionTitle} 
          containerStyle={styles.learnActionContainerWrite}
          iconContainerStyle={styles.learnActionIconContainer}
          onPress={this.handleWriteLearnAction}
          key={2}
        />
      </View>
      ]
  }

  renderCubeFaces(cube, i) {
    return <View key={i}>
      <ListItem 
        title={cube.name}
        key={0}
        rightIcon={{
          name:'arrow-drop-up',
          type:'ionicons',
          color: Colors.gray2
        }}
        onPress={() => this.toggleActiveCube(null)}
        containerStyle={styles.highlightedListItem}
      />
      {cube.face_set
        .filter(face => this.isSubscribedFace(face.category))
        .map((face, index) => 
          <ListItem 
            key={index+1}
            subtitle={face.value}
            title={this.getCategoryNameFromId(face.category)} 
            containerStyle={styles.faceContainer}
            titleStyle={styles.faceSubtitle}
            subtitleStyle={styles.faceTitle}
          />
        )
      }
    </View>
  }

  renderCubeSearch() {
    return <SearchBar 
      platform='ios'
      containerStyle={styles.searchBarContainer}
      placeholder='search'
      onChangeText={this.handleSearchChange}
      onClear={() => this.handleSearchChange('')}
      cancelButtonProps={{
        color: Colors.primary
      }}
      value={this.state.cubeSearch != '' ? this.state.cubeSearch : null}
    />
  }

  renderCubeList() {
      const { currentTower } = this.props.tower
      
      // default state
      if (!currentTower.fetched && !currentTower.fetching && !currentTower.error) {
        this.fetchCubes()
      }

      // state when we need to replace the current tower
      else if (currentTower.tower != this.state.tower.id) {
        this.fetchCubes()
        return <ActivityIndicator />
      }

      // state when tower cubes are being fetched
      if (currentTower.fetching) return <ActivityIndicator />

      // state when tower cubes are fetched
      if (!currentTower.fetching && currentTower.fetched) {
        return currentTower.cubes
          .filter(cube => this.cubeMatchesSearch(cube.name))
          .map((cube, index) =>{
            if (this.state.activeCube == cube.id) {
              return this.renderCubeFaces(cube, index)
            }
            return <ListItem 
              title={cube.name} 
              key={index}
              rightIcon={{
                name:'arrow-drop-down',
                type:'ionicons',
                color: Colors.gray2
              }}
              onPress={() => this.toggleActiveCube(cube.id)}
              bottomDivider
            />
          })
      }
  }

  toggleActiveCube(activeCube) {
    this.setState({activeCube})
  }

  render() {

    return (
      <View contentContainerStyle={styles.container}>
        <View style={Styles.titleStyle}>
          <Text style={Styles.display2}>{this.state.tower.name}</Text>
        </View>
        <View style={styles.categoryManager}>
          <View style={styles.categories}>{this.renderTowerCategories()}</View>
        </View>
        <View style={styles.progress}>
         
        </View>
        <View style={styles.learnActions}>
          {this.renderLearnActions()}
        </View>
        <View style={styles.cubes}>
          <Text style={Styles.headline}>Cubes 
            <Text style={styles.grayHeadline}> | {this.state.tower.num_cubes}</Text>
          </Text>
          <View>
            {this.renderCubeSearch()}
          </View>
          <ScrollView>
            {this.renderCubeList()}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  categoryManager: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  categories: {
    ...Styles.subtitleStyle,
  },
  progress: {
    width: '100%'
  },
  learnActions: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    padding: Styles.containerPadding,
    paddingBottom: 0
  },
  learnActionsAction: {
    flexBasis: '50%',
    padding: 5
  },
  learnActionTitle: {
    ...Styles.smallSemiBold,
    color: Colors.white
  },
  learnActionButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    display: 'flex',
    flexDirection: 'column'
  },
  learnActionIconContainer: {
  },
  learnActionContainerFlash: {
    ...Styles.shadow,
    backgroundColor: Colors.primary
  },  
  learnActionContainerWrite: {
    ...Styles.shadow,
    backgroundColor: Colors.secondary
  },
  cubes: {
    width: '100%',
    marginTop: 10,
    padding: Styles.containerPadding
  },
  searchBarContainer: {
    backgroundColor: 'transparent'
  },
  categoryLabelHighlighted: {
    ...Styles.xxsmallText,
    textTransform: 'uppercase',
    color: Colors.gray1,
  },
  grayHeadline: {
    ...Styles.headline,
    color: Colors.gray2
  },
  highlightedListItem: {
    backgroundColor: Colors.gray5
  },
  faceContainer: {
    paddingLeft: 30,
    paddingVertical: 5,
    backgroundColor: Colors.gray5
  },
  faceTitle: {
    ...Styles.smallText
  },
  faceSubtitle: {
    ...Styles.xxsmallText,
    textTransform: 'uppercase',
    color: Colors.gray2
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TowerDetailScreen)