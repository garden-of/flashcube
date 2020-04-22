import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as userActions from '../actions/user'
import * as towerActions from '../actions/tower'

import { View, StyleSheet, Animated, PanResponder, Dimensions, ActivityIndicator } from 'react-native'
import { Card, Input, Button, Icon } from 'react-native-elements'
import * as Progress from 'react-native-progress'

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

// calculate the Levenshtein distance between the expected
// answer and the actual answer.
const stringSimilarity = (a, b) => {
  if (a.length == 0) return null
  if (b.length == 0) return null

  a = a.toLowerCase()
  b = b.toLowerCase()

  let matrix = []

  for (let i=0; i <= b.length; i++) {
    matrix[i] = [i]
  }
  for (let j=0; j <= a.length; j++) {
    matrix[0][j] = j
  }
  
  for (let i=1; i <= b.length; i++) {
    for (let j=1; j <= a.length; j++) {
      if(b.charAt(i-1) == a.charAt(j-1)) {
        matrix[i][j] = matrix[i-1][j-1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i-1][j-1] + 1,  // substitution
          Math.min(
            matrix[i][j-1] + 1,
            matrix[i-1][j] +1
          )
        )
      }
    }
  }
  return matrix[b.length][a.length]
}

class WriteScreen extends React.Component {

  constructor(props) {
    super(props)

    const defaultCubeFields = this.props.tower.currentTower.cubes
      .reduce( (map, cube) => {
        map[cube.id] = cube.face_set.filter(face => 
          this.props.user.profile.preferences.learningCategories.includes(face.category)
        ).reduce( (innerMap, face) => {
          innerMap[face.id] = {...face, currentValue: null, accuracy: null}
          return innerMap
        }, {})
        return map
      }, {})

    this.state = {
      tower: this.props.navigation.getParam('tower'),
      activeCube: 0,
      cubeValues: defaultCubeFields,
      hideAnswers: true,
      pan: new Animated.ValueXY(),
      topCard: new Animated.Value(0),
      secondCard: new Animated.Value(0),
      backCard: new Animated.Value(0),
    }

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: ( event, gestureState ) => {
        this.state.pan.setValue(
          { x: gestureState.dx, y: gestureState.dy }
        )
      },
      onPanResponderTerminationRequest: () => false,
      onPanResponderRelease: ( event, gestureState ) => {
        

        // go to the next face if threshold is reached
        if ( (Math.abs(gestureState.dx / SCREENWIDTH) > 0.40) ) {

          // bring the translationX back to 0 quickly
          Animated.timing( this.state.pan, {
            toValue: 0,
            duration: 0
          }).start()

          this.setState({
            activeCube: this.state.activeCube+1,
            hideAnswers: true
          }, () => {

            
            // interpolate values in each cube view
            Animated.timing( this.state.backCard, {
              toValue: 1,
              duration: 300
            })

            Animated.timing( this.state.topCard, {
              toValue: 1,
              duration: 400
            })

            Animated.timing( this.state.secondCard, {
              toValue: 1,
              duration: 500
            }).start(() => {
              // reset value to 0 when animation completes
              this.state.backCard.setValue(0)
              this.state.topCard.setValue(0)
              this.state.secondCard.setValue(0)
            })
          })

        } else {
          // bring the translationX back to 0 slowly, we 
          // didnt rotate the card
          Animated.timing( this.state.pan, {
            toValue: 0,
            duration: 200
          }).start()
        }
      }
    }),

    this.getCategoryNameFromId = this.getCategoryNameFromId.bind(this)
    this.getRelativeRotation = this.getRelativeRotation.bind(this)
    this.renderCards = this.renderCards.bind(this)
    this.renderFaceInputs = this.renderFaceInputs.bind(this)
    this.getZIndexRange = this.getZIndexRange.bind(this)
  }

  static navigationOptions = ({ navigation }) => {
    const tower = navigation.getParam('tower')
    return {
      title: tower.name
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ toggleSubscription: this.toggleSubscription})

    // fetch relevant store data
    const { categories, currentTower } = this.props.tower
    const { profile } = this.props.user

    if (!categories.fetching && !categories.fetched) this.props.getCategories()
    if (!currentTower.fetching && !currentTower.fetched) this.props.getTowerCubes(this.state.tower.id)
    if (!profile.fetching && !profile.fetched) this.props.getUser()
  }

  componentDidUpdate(prevProps) {
    const { towers } = this.props.tower.towers
    const newTower = this.props.navigation.getParam('tower')

    if (newTower.id != this.state.tower.id) {
      this.setState({tower: towers.filter(tower => newTower == tower.id)[0]})
      this.props.getTowerCubes(newTower.id)
    }
  }

  getCategoryNameFromId(categoryId) {
    let { categories } = this.props.tower.categories
    return categories.find(c => c.id == categoryId).category
  }

  getFaceStatusIndicator(cubeId, faceId) {
    const accuracy = this.state.cubeValues[cubeId][faceId].accuracy

    if (accuracy == null) return 'ios-radio-button-off'
    if (accuracy == 0) return 'ios-checkmark-circle'
    if (accuracy < 3) return 'ios-alert'
    return 'ios-close-circle'

  }

  getFaceStatusColor(cubeId, faceId) {
    const accuracy = this.state.cubeValues[cubeId][faceId].accuracy

    if (accuracy == null) return Colors.gray5
    if (accuracy == 0) return Colors.primary
    if (accuracy < 3) return Colors.secondary
    return Colors.red

  }

  getZIndex(len, current, index) {
    if (current == index) return len
    if (current > index) return current - index
    if (current < index) return len - index + current
  }

  getScaleXRange(len, relativeIndex) {

    // FRONT CARD
    // front card needs to shrink to the min size
    // this happens first
    if (relativeIndex == 0) {
      return this.state.topCard.interpolate({
        inputRange: [0,1],
        outputRange: [1,0]
      })
    }

    // SECOND CARD
    // needs to scale up to 1
    if (relativeIndex == 1) {
      return this.state.topCard.interpolate({
        inputRange: [0,1],
        outputRange: [1.0 - ( relativeIndex * .02 ), 1]
      })
    }

    // NTH CARD
    // scales up by increment
    return this.state.backCard.interpolate({
      inputRange: [0,1],
      outputRange: [1.0 - ( relativeIndex * .02 ), 1.0 - ( relativeIndex * .02 ) + .02]
    })

  }

  getZIndexRange(len, zIndex) {
    
    // FRONT CARD
    // the front card needs to go to the back, so z=0
    // this transition should happen the fastest
    if (zIndex == len) {
      return this.state.topCard.interpolate({
        inputRange: [0,1],
        outputRange: [zIndex, 0]
      })
    }

    // SECOND CARD
    // the second card needs to be promoted to the first
    // this is the second transition
    if (zIndex == (len-1)) {
      return this.state.secondCard.interpolate({
        inputRange: [0,1],
        outputRange: [zIndex, zIndex+1]
      })
    }

    // NTH CARD
    // same logic as second card, but needs to happen last
    return this.state.backCard.interpolate({
      inputRange: [0,1],
      outputRange: [zIndex, zIndex+1]
    })

  }

  getRelativeIndex(len, current, index) {
    if (current == index) return 0
    if (current > index ) return len
    if (current < index) return index - current
  }

  getRelativeOpacity(index) {
    return 1.0 - (.05 * (index*index))
  }

  getRelativeRotation() {
    const rotationX = SCREENWIDTH * 2

    return this.state.pan.x.interpolate({
      inputRange: [-rotationX, 0, rotationX],
      outputRange: ['-25deg', '0deg', '25deg']
    })
  }

  
  handleInputChange(cubeId, faceId, text) {
    this.setState({
      cubeValues: {
        ...this.state.cubeValues,
        [cubeId]: {
          ...this.state.cubeValues[cubeId],
          [faceId]: {
            ...this.state.cubeValues[cubeId][faceId],
            currentValue: text,
            accuracy: stringSimilarity(this.state.cubeValues[cubeId][faceId].value, text)
          }
        }
      }
    })
  }

  renderCards(cubes) {

    return cubes.map( (cube, index) => {

      let relativeIndex = this.getRelativeIndex(cubes.length, this.state.activeCube, index)
      let zIndex = this.getZIndex(cubes.length, this.state.activeCube, index)
      
      if (relativeIndex > 5) return null

      return <Animated.View
        {...this.panResponder.panHandlers}
        key={index}
        style={[
          styles.cardView,
          {
            zIndex: this.getZIndexRange(cubes.length, zIndex),
            transform: [
              { scaleX: this.getScaleXRange(cubes.length, relativeIndex)},
              { translateX: index == this.state.activeCube ? this.state.pan.x : 0 },
              { translateY: index == this.state.activeCube ? this.state.pan.y : 0 },
              { rotateZ: index == this.state.activeCube ? this.getRelativeRotation() : 0 },
            ],
            top: 10 - ( relativeIndex * 3),
            opacity: this.getRelativeOpacity(relativeIndex)
          }
        ]}
      >
        <Card
          title={cube.name}
          containerStyle={styles.cube}
        >
          {this.renderFaceInputs(cube)}
        </Card>
      </Animated.View>
      }
    )
  }

  renderCardStack() {

    const { currentTower } = this.props.tower

    return [
      <View style={styles.progressContainer} key={0}>
        <Progress.Bar
          progress={(this.state.activeCube + 1) / currentTower.cubes.length}
          borderRadius={1}
          width={null}
          height={7}
          borderWidth={0}
          color={Colors.primary}
          unfilledColor={Colors.gray6}
        />
      </View>,
      <View style={styles.cardContainer} key={1}>
        {this.renderCards(currentTower.cubes)}
      </View>,
      <View style={styles.controlContainer} key={2}>
        <Icon 
          type='ionicon'
          name='ios-arrow-back'
          color={Colors.gray1}
          onPress={() => this.setState({
            activeCube: Math.max(this.state.activeCube - 1, 0),
            hideAnswers: true
          })}
          raised
        />
        <Icon 
          type='ionicon'
          name={this.state.hideAnswers ? 'ios-eye' : 'ios-eye-off'}
          color={Colors.gray1}
          onPress={() => this.setState({hideAnswers: !this.state.hideAnswers})}
          raised
        />
        <Icon 
          type='ionicon'
          name='ios-refresh'
          color={Colors.gray1}
          onPress={() => this.setState({
            activeCube: 0,
            hideAnswers: true
          })}
          raised
        />
        <Icon 
          type='ionicon'
          name='ios-arrow-forward'
          color={Colors.gray1}
          onPress={() => this.setState({
            activeCube: Math.min(this.state.activeCube + 1, currentTower.cubes.length),
            hideAnswers: true
          })}
          raised
        />
      </View>
    ]
  }

  renderFaceInputs(cube) {
    
    const { baseCategory, learningCategories } = this.props.user.profile.preferences


    return cube.face_set
      .filter(face => face.category != baseCategory)
      .filter(face => learningCategories.includes(face.category))
      .sort((a, b) => {
        let aName = this.getCategoryNameFromId(a.category)
        let bName = this.getCategoryNameFromId(b.category)
        if (aName > bName) return 1
        if (aName < bName) return -1
        return 0
      } )
      .map((face, index) => {
        return <View style={styles.faceContianer} key={index}>
          <View style={styles.faceInputContainer}>
            <Input 
              label={this.getCategoryNameFromId(face.category)}
              autoCapitalize='none' 
              labelStyle={{
                ...Styles.xsmallText,
                color: Colors.gray3,
                textTransform: 'uppercase',
              }}
              key={index}
              value={this.state.cubeValues[cube.id][face.id].currentValue}
              placeholder={this.state.hideAnswers ? null : this.state.cubeValues[cube.id][face.id].value }
              onChangeText={(text) => this.handleInputChange(cube.id, face.id, text)}
              rightIcon={this.state.cubeValues[cube.id][face.id].currentValue 
                ? {
                  name: this.getFaceStatusIndicator(cube.id, face.id),
                  type: 'ionicon',
                  color: this.getFaceStatusColor(cube.id, face.id)
                 }
                : null}
            />
          </View>
        </View>
        }
      )
  }

  render() {

    // requires the following reducers to be loaded:
    // - tower.categories
    // - tower.currentTower
    // - user.profile
    const { categories, currentTower } = this.props.tower
    const { profile } = this.props.user

    // default state when no fetch attempt has been made
    if ((!categories.fetched && !categories.error) || (!currentTower.fetched && !currentTower.error) || 
        (!profile.fetched && !profile.error)) {
      return <View style={styles.container}>
        <ActivityIndicator size='large'/>
      </View>
    }

    // default state when loading
    if (categories.fetching || currentTower.fetching || profile.fetching) {
      return <View style={styles.container}>
        <ActivityIndicator size='large'/>
      </View>
    }
    
    // show error if loading fails
    if (categories.error || currentTower.error || profile.error) {
      return <View style={styles.container}>
        <Icon name='error' color={Colors.gray4} size={50} />
      </View>
    }

    return (
      <View style={styles.container}>
        {this.renderCardStack()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    progressContainer: {
      flexBasis: '5%',
      paddingHorizontal: 20,
      paddingTop: 25
    },
    cardContainer: {
      flexBasis: '83%',
      display: 'flex',
      flexDirection: 'column',
    },
    controlContainer: {
      flexBasis: '12%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: -1,
    },  
    cardView: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
    },
    cube: {
      backgroundColor: Colors.gray6,
      borderColor: Colors.gray6,
      width: '93%',
      height: '94%'
    },
    faceContianer: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      paddingBottom: 20,
      paddingRight: 5
    },
    faceInputContainer: {
      flexBasis: '100%'
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(WriteScreen)