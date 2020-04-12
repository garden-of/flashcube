import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as userActions from '../actions/user'
import * as towerActions from '../actions/tower'

import { View, StyleSheet, Animated, PanResponder, Dimensions } from 'react-native'
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
      stackedAnim: new Animated.Value( 0 )
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
        
        // bring the translationX back to 0
        Animated.timing( this.state.pan, {
          toValue: 0,
          duration: 300
        }).start()

        // go to the next face if threshold is reached
        if ( (gestureState.dx / SCREENWIDTH) > 0.2) {

          // interpolate values in each cube view
          Animated.timing( this.state.stackedAnim, {
            toValue: 1,
            duration: 300
          }).start(() => {
            // reset value to 0 when animation completes
            this.state.stackedAnim.setValue(0)
          })

          this.setState({
            activeCube: this.state.activeCube+1
          })

        }
      }
    }),

    this.fetchCubes = this.fetchCubes.bind(this)
    this.getCategoryNameFromId = this.getCategoryNameFromId.bind(this)
    this.renderCards = this.renderCards.bind(this)
    this.renderFaceInputs = this.renderFaceInputs.bind(this)
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

  renderCards(cubes) {

    return [
      // back cube
      <Animated.View 
        { ...this.panResponder.panHandlers }
        style={[styles.cardView, {
          zIndex: 1,
          transform: [
            { scaleX: this.state.stackedAnim.interpolate({
              inputRange: [0,1],
              outputRange: [0.9,0.95]
            }) },
          ],
          top: this.state.stackedAnim.interpolate({
            inputRange: [0,1],
            outputRange: [0,5]
          }),
        }]} 
        key={3}
      >
        <Card
          title={cubes[this.state.activeCube+2].name}
          containerStyle={styles.cube}
        >
        </Card>
      </Animated.View>,

      // middle cube
      <Animated.View 
        { ...this.panResponder.panHandlers }
        style={[styles.cardView, {
          zIndex: 2,
          transform: [
            { scaleX: this.state.stackedAnim.interpolate({
              inputRange: [0,1],
              outputRange: [0.95,1]
            }) },
          ],
          top: this.state.stackedAnim.interpolate({
            inputRange: [0,1],
            outputRange: [5,10]
          }),
        }]} 
        key={2}
      >
        <Card
          title={cubes[this.state.activeCube+1].name}
          containerStyle={styles.cube}
        >
        </Card>
      </Animated.View>,

      // front cube
      <Animated.View 
        { ...this.panResponder.panHandlers }
        style={[styles.cardView, {
          zIndex: this.state.stackedAnim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [ 3, 2, 0]
          }),
          transform: [
            { translateX: this.state.pan.x },
            { translateY: this.state.pan.y },
            { scaleX: this.state.stackedAnim.interpolate({
              inputRange: [0,1],
              outputRange: [1,0.9]
            }) },
          ],
          top: this.state.stackedAnim.interpolate({
            inputRange: [0,1],
            outputRange: [10,0]
          }),
        }]} 
        key={1}
      >
        <Card
          title={cubes[this.state.activeCube].name}
          containerStyle={styles.cube}
        >
          <View style={styles.inputContainer}>
            {this.renderFaceInputs(cubes[this.state.activeCube])}
          </View>
        </Card>
      </Animated.View>,

    

    ]
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