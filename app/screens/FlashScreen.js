import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as userActions from '../actions/user'
import * as towerActions from '../actions/tower'

import { View, ScrollView, StyleSheet, Animated, PanResponder, Dimensions, ActivityIndicator, Text } from 'react-native'
import { Card, Input, Button, Icon } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient'
import * as Progress from 'react-native-progress'

import CubeNavigationHorizontal from '../components/CubeNavigationHorizontal/CubeNavigationHorizontal'

import Styles from '../constants/Styles'
import Colors from '../constants/Colors'

const SCREENWIDTH = Math.round(Dimensions.get('window').width)
const SCREENHEIGHT = Math.round(Dimensions.get('window').height)

const mapStateToProps = state => ({
  ...state
})
  
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    ...userActions,
    ...towerActions
  }, dispatch)
}

class FlashScreen extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      tower: this.props.navigation.getParam('tower'),
      activeCube: 0,
      activeFace: this.props.user.profile.preferences.baseCategory,
      pan: new Animated.Value(0)
    }


    this.fetchCubes = this.fetchCubes.bind(this)
    this.getCategoryNameFromId = this.getCategoryNameFromId.bind(this)
    this.handleCubeSwipe = this.handleCubeSwipe.bind(this)
    this.renderCards = this.renderCubes.bind(this)
    this.renderCubeFaces = this.renderCubeFaces.bind(this)
  }

  static navigationOptions = ({ navigation }) => {
    const tower = navigation.getParam('tower')
    return {
      title: tower.name
    }
  }

  fetchCubes(towerId) {
    this.props.getTowerCubes(this.state.tower.id)
  }

  getCategoryNameFromId(categoryId) {
    let { categories } = this.props.tower.categories
    return categories.find(c => c.id == categoryId).category
  }

  getRelativeIndex(len, current, index) {
    if (current == index) return 0
    if (current > index ) return -1 * (current - index)
    if (current < index) return index - current
  }

  getZIndex(len, current, index) {
    if (current == index) return len
    if (current > index) return current - index
    if (current < index) return len - index + current
  }

  handleCubeSwipe(newFace) {
    
    const { learningCategories, baseCategory } = this.props.user.profile.preferences
    const faces = [...learningCategories, baseCategory]
      .sort((a,b) => {
        if (a = baseCategory) return -1
        let aName = this.getCategoryNameFromId(a)
        let bName = this.getCategoryNameFromId(b)
        if (aName > bName) return 1
        if (aName < bName) return -1
        return 0
      })

    this.setState({ activeFace: faces[newFace] })

  }

  renderCubeFaces(cube, index, relativeIndex) {
    
    const { learningCategories, baseCategory } = this.props.user.profile.preferences

    return cube.face_set
        .filter(face => learningCategories.includes(face.category) || baseCategory == face.category)
        .sort((a,b) => {
          if (a.category = baseCategory) return -1
          let aName = this.getCategoryNameFromId(a.category)
          let bName = this.getCategoryNameFromId(b.category)
          if (aName > bName) return 1
          if (aName < bName) return -1
          return 0
        })
        .map( (face, index) => {
            return <View 
              style={[
                styles.card,
                {
                  backgroundColor: relativeIndex == 0 ? Colors.gray6 : Colors.gray7
                }]}
              key={index}
            >
                <Text style={[Styles.mediumSemiBold, styles.cubeValue]}>
                    {face.value}
                </Text>
            </View>
        })
  }

  renderCategories() {
    const { learningCategories, baseCategory } = this.props.user.profile.preferences
    return [...learningCategories, baseCategory]
      .sort((a,b) => {
        if (a = baseCategory) return -1
        let aName = this.getCategoryNameFromId(a)
        let bName = this.getCategoryNameFromId(b)
        if (aName > bName) return 1
        if (aName < bName) return -1
        return 0
      })
      .map((category, index) => <Text
        key={index}
        style={{
          ...Styles.xsmallTagCaps,
          color: this.state.activeFace == category ? Colors.primary : Colors.gray3,
        }}
      >
        {this.getCategoryNameFromId(category)}
      </Text>)
      .reduce( (prev, current) => [
        prev,
        <Text 
          key={prev.key+.5}
          style={{
            ...Styles.xxsmallTagCaps
          }}
        > | </Text>,
        current
      ])
  }

  renderCubes(cubes) {

    return cubes.map( (cube, index) => {

      let relativeIndex = this.getRelativeIndex(cubes.length, this.state.activeCube, index)

      const interpolatedIndex = this.state.pan.interpolate({
        inputRange: [this.state.activeCube, this.state.activeCube+1],
        outputRange: [relativeIndex, relativeIndex-1]
      })

      return <View key={index} style={{zIndex: this.getZIndex(cubes.length, this.state.activeCube, index)}}>
        <CubeNavigationHorizontal 
          loop 
          relativeIndex={relativeIndex} 
          height={300} 
          width={350}
          callBackAfterSwipe={this.handleCubeSwipe}
        >
            {this.renderCubeFaces(cube, index, relativeIndex)}
        </CubeNavigationHorizontal>
      </View>
      }
    )
  }

  renderCardStack() {

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

    return [
      <View key={0} style={{zIndex: 1000}}>
          <LinearGradient 
            colors={[Colors.transparent, Colors.white, Colors.white]} 
            end={[0,0]}
            start={[0,1]}
            style={styles.progressContainer}
        >
          <Progress.Bar
            progress={(this.state.activeCube + 1) / currentTower.cubes.length}
            borderRadius={1}
            width={null}
            height={7}
            borderWidth={0}
            color={Colors.primary}
            unfilledColor={Colors.gray6}
            style={styles.progressBar}
          />
          <View
            style={styles.currentFace}
          >
            {this.renderCategories()}
          </View>
        </LinearGradient>
      </View>,
      <View 
        style={styles.cubeContainer} 
        key={1}
      >
          {this.renderCubes(currentTower.cubes)}
      </View>,
      <View key={2}>
        <LinearGradient 
            colors={[Colors.transparent, Colors.white, Colors.white]} 
            style={styles.controlContainer}
            end={[0,1]}
            start={[0,0]}
        >
          <Icon 
            type='ionicon'
            name='ios-arrow-up'
            color={Colors.gray1}
            onPress={() => this.setState({
              activeCube: Math.max(this.state.activeCube - 1, 0),
              activeFace: this.props.user.profile.preferences.baseCategory
            })}
            raised
          />
          <Icon 
            type='ionicon'
            name='ios-refresh'
            color={Colors.gray1}
            onPress={() => this.setState({activeCube: 0})}
            raised
          />
          <Icon 
            type='ionicon'
            name='ios-arrow-down'
            color={Colors.gray1}
            onPress={() => {
              Animated.timing( this.state.pan, {
                toValue: this.state.activeCube+1,
                duration: 200
              }).start(() =>  
                this.setState({
                  activeCube: Math.min(this.state.activeCube + 1, currentTower.cubes.length),
                  activeFace: this.props.user.profile.preferences.baseCategory
                })
              )
            }}
            raised
          />
        </LinearGradient>
      </View>
    ]
  }

  render() {

    return (
      <View style={styles.container}>
        {this.renderCardStack()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    progressContainer: {
      flexBasis: '15%',
    },
    progressBar: {
        marginTop: 25,
        marginHorizontal: 20,
    },
    currentFace: {
      marginTop: 25,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center'
    },
    card: {
      backgroundColor: Colors.gray6,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      shadowColor: Colors.gray1,
      shadowOffset: {
	    width: 0,
	    height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2.22,
      elevation: 3,
      borderBottomColor: Colors.gray6,
      borderBottomWidth: 1
    },
    controlContainer: {
      flexBasis: '15%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
    },
    cubeContainer: {
      flexBasis: '70%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      zIndex: 0
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(FlashScreen)