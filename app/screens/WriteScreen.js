import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as userActions from '../actions/user'
import * as towerActions from '../actions/tower'

import { View, StyleSheet, Animated, PanResponder, Dimensions, ActivityIndicator } from 'react-native'
import { Card, Input, Button, Icon } from 'react-native-elements'

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

class WriteScreen extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      tower: this.props.navigation.getParam('tower'),
      activeCube: 0,
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

          this.setState({activeCube: this.state.activeCube+1}, () => {

            
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

    this.fetchCubes = this.fetchCubes.bind(this)
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

  fetchCubes(towerId) {
    this.props.getTowerCubes(this.state.tower.id)
  }

  getCategoryNameFromId(categoryId) {
    let { categories } = this.props.tower.categories
    return categories.find(c => c.id == categoryId).category
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

    return this.renderCards(currentTower.cubes)
  }

  renderFaceInputs(cube) {
    
    const { baseCategory, learningCategories } = this.props.user.profile.preferences
    
    return cube.face_set
      .filter(face => face.category != baseCategory)
      .filter(face => learningCategories.includes(face.category))
      .map((face, index) => 
        <View style={styles.faceContianer} key={index}>
          <View style={styles.faceInputContainer}>
            <Input 
              label={this.getCategoryNameFromId(face.category)} 
              labelStyle={{
                ...Styles.xsmallText,
                color: Colors.gray3,
                textTransform: 'uppercase',
              }}
              key={index}
            />
          </View>
          <View style={styles.faceActionsContainer}>
            <Button 
              icon={
                <Icon
                name='ios-eye'
                type='ionicon'
                size={25}
                color={Colors.gray4}
                />
              }
              buttonStyle={Styles.iconButtonStyle} 
              titleStyle={Styles.iconButtonTextStyle} 
              containerStyle={styles.iconbuttonContainer}
            />
            <Button 
              icon={
                <Icon
                name='ios-radio-button-off'
                type='ionicon'
                size={20}
                color={Colors.gray4}
                />
              }
              buttonStyle={Styles.iconButtonStyle} 
              titleStyle={Styles.iconButtonTextStyle} 
              containerStyle={styles.iconbuttonContainer}
            />
          </View>
        </View>
      )
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
      display: 'flex',
      flexDirection: 'column',
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
      paddingRight: 20
    },
    faceInputContainer: {
      flexBasis: '85%'
    },
    faceActionsContainer: {
      flexBasis: '15%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(WriteScreen)