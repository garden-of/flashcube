import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as userActions from '../actions/user'
import * as towerActions from '../actions/tower'

import { View, StyleSheet, Animated, PanResponder, Dimensions, 
         ActivityIndicator, TouchableWithoutFeedback, Keyboard,
         KeyboardAvoidingView, Text } from 'react-native'
import { Card, Input, Button, Icon } from 'react-native-elements'

import SegmentedProgressBar from '../components/SegmentedProgressBar/SegmentedProgressBar'

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

function debounce(a,b,c) {var d,e;return function(){function h(){d=null,c||(e=a.apply(f,g))}var f=this,g=arguments;return clearTimeout(d),d=setTimeout(h,b),c&&!d&&(e=a.apply(f,g)),e}}

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
      activeCube: 0,
      backCard: new Animated.Value(0),
      cubeValues: defaultCubeFields,
      hideAnswers: true,
      inputFocused: null,
      inputFocusIndex: 0,
      keyboardVisible: false,
      learnedCards: [],
      pan: new Animated.ValueXY(),
      secondCard: new Animated.Value(0),
      stillLearningCards: [],
      toast: new Animated.Value(0),
      topCard: new Animated.Value(0),
      tower: this.props.navigation.getParam('tower'),
    }

    this.panResponder = PanResponder.create({

      // only allow swipes if the keyboard is not visible
      onStartShouldSetPanResponder: ( event, gestureState ) => {
        return !this.state.keyboardVisible
      },
      onPanResponderMove: ( event, gestureState ) => {
        this.state.pan.setValue(
          { x: gestureState.dx, y: gestureState.dy }
        )
        this.state.toast.setValue(gestureState.dx)
      },
      onPanResponderTerminationRequest: () => false,
      onPanResponderRelease: ( event, gestureState ) => {
        

        // fade out the toast
        Animated.timing( this.state.toast, {
          toValue: 0,
          duration: 150
        }).start()

        // go to the next face if threshold is reached
        if ( (Math.abs(gestureState.dx / SCREENWIDTH) > 0.40) ) {

          // add the cube to the appropriate list
          if (gestureState.dx > 0) {
            this.setState({learnedCards: [...this.state.learnedCards, this.state.activeCube]})
          } else {
            this.setState({stillLearningCards: [...this.state.stillLearningCards, this.state.activeCube]})
          }

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
    this.getZIndexRange = this.getZIndexRange.bind(this)
    this.renderCards = this.renderCards.bind(this)
    this.renderFaceInputs = this.renderFaceInputs.bind(this)
    this.renderSummary = this.renderSummary.bind(this)
    this.setAccuracy = this.setAccuracy.bind(this)
    this.toggleKeyboardState = this.toggleKeyboardState.bind(this)
  }

  static navigationOptions = ({ navigation }) => {
    const tower = navigation.getParam('tower')
    return {
      title: tower.name
    }
  }

  toggleKeyboardState() {
    this.setState({
      keyboardVisible: !this.state.keyboardVisible
    })
  }

  componentDidMount() {
    this.props.navigation.setParams({ toggleSubscription: this.toggleSubscription})

    // fetch relevant store data
    const { categories, currentTower } = this.props.tower
    const { profile } = this.props.user

    // store the state of the keyboard, important for animations
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.toggleKeyboardState)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.toggleKeyboardState)

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

  componentWillUnmount() {
    this.keyboardDidHideListener.remove()
    this.keyboardDidShowListener.remove()
  }

  getCategoryNameFromId(categoryId) {
    let { categories } = this.props.tower.categories
    return categories.find(c => c.id == categoryId).category
  }

  getFaceStatusIndicator(cubeId, faceId) {
    const { accuracy, value, currentValue } = this.state.cubeValues[cubeId][faceId]

    if (!currentValue) return 'ios-radio-button-off'
    if (currentValue.length / value.length < 0.3) return 'ios-radio-button-off'

    const pctAccurate = (value.length - accuracy) / value.length

    if (accuracy == null) return 'ios-radio-button-off'
    if (accuracy == 0) return 'ios-checkmark-circle'
    if (pctAccurate >= 0.85) return 'ios-alert'
    return 'ios-close-circle'

  }

  getFaceStatusColor(cubeId, faceId) {
    const { accuracy, value, currentValue } = this.state.cubeValues[cubeId][faceId]

    const pctAccurate = (value.length - accuracy) / value.length

    if (accuracy == null) return Colors.gray5
    if (currentValue.length / value.length < 0.3) return Colors.gray5

    if (accuracy == 0) return Colors.primary
    if (pctAccurate >= 0.85) return Colors.primary
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

  setAccuracy(cubeId, faceId) {
    this.setState({
      cubeValues: {
        ...this.state.cubeValues,
        [cubeId]: {
          ...this.state.cubeValues[cubeId],
          [faceId]: {
            ...this.state.cubeValues[cubeId][faceId],
            accuracy: stringSimilarity(
              this.state.cubeValues[cubeId][faceId].value, 
              this.state.cubeValues[cubeId][faceId].currentValue)
          }
        }
      }
    })
  }

  handleInputChange(cubeId, faceId, text) {

    // if we are 100% accurate, skip the debounce
    if (text === this.state.cubeValues[cubeId][faceId].value) {
      this.setState({
        cubeValues: {
          ...this.state.cubeValues,
          [cubeId]: {
            ...this.state.cubeValues[cubeId],
            [faceId]: {
              ...this.state.cubeValues[cubeId][faceId],
              currentValue: text,
              accuracy: 0
            }
          }
        }
      })
    } 
    
    // if we were at 100% accuracy and there is a change,
    // set the accuracy to one and debounce
    else if (this.state.cubeValues[cubeId][faceId].accuracy === 0) {
      this.setState({
        cubeValues: {
          ...this.state.cubeValues,
          [cubeId]: {
            ...this.state.cubeValues[cubeId],
            [faceId]: {
              ...this.state.cubeValues[cubeId][faceId],
              currentValue: text,
              accuracy: 1
            }
          }
        }
        }, debounce(() => this.setAccuracy(cubeId, faceId), 2000)
      )
    }

    // in all other scenarios, just set the text value and
    // debounce the accuracy change
    else {
      this.setState({
        cubeValues: {
          ...this.state.cubeValues,
          [cubeId]: {
            ...this.state.cubeValues[cubeId],
            [faceId]: {
              ...this.state.cubeValues[cubeId][faceId],
              currentValue: text,
            }
          }
        }
      }, debounce(() => this.setAccuracy(cubeId, faceId), 2000)
    )
    }
  }

  renderCards(cubes) {

    const { defaultList } = this.props.user.defaultList

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
          title={<View style={styles.cardTitle}>
            <View style={styles.cardTitlePadLeft}></View>
            <Text style={styles.cardTitleText}>{cube.name}</Text>
            <Icon
              containerStyle={styles.cardTitleIcon}
              name='star'
              type='ionicons'
              color={defaultList.cubes.includes(cube.id) ? Colors.primary : Colors.gray3}
              onPress={() => this.toggleCubeList(cube.id)}
            />
          </View>}
          containerStyle={[
            styles.cube,
            {
              height: '94%'
            }
          ]}
        >
          {this.renderFaceInputs(cube)}
        </Card>
      </Animated.View>
      }
    )
  }

  renderCardStack() {

    const { currentTower } = this.props.tower

    let leftToastOpacity = this.state.toast.interpolate({
      inputRange: [-125, 0],
      outputRange: [0.85, 0.0],
      extrapolate: 'clamp'
    })

    let leftToastZ = this.state.toast.interpolate({
      inputRange: [-1, 0],
      outputRange: [10000, -10000],
      extrapolate: 'clamp'
    })

    let rightToastOpacity = this.state.toast.interpolate({
      inputRange: [0, 125],
      outputRange: [0.0, 0.85],
      extrapolate: 'clamp'
    })

    let rightToastZ = this.state.toast.interpolate({
      inputRange: [0, 1],
      outputRange: [-10000, 10000],
      extrapolate: 'clamp'
    })

    return [
      <View style={styles.progressContainer} key={0}>
        <Text style={styles.progressText}>{this.state.activeCube+1}</Text>
        <View style={styles.progressBar}>
          <SegmentedProgressBar 
            learning={this.state.stillLearningCards.length}
            learned={this.state.learnedCards.length}
            total={currentTower.cubes.length}
          />
        </View>
        <Text style={styles.progressText}>{currentTower.cubes.length}</Text>
      </View>,
      <View style={styles.cardContainer} key={1}>
        {this.renderCards(currentTower.cubes)}
      </View>,

      <KeyboardAvoidingView behavior='position' key={2} keyboardVerticalOffset={80}>
        <View style={styles.controlContainer}>
          <Icon 
            type='ionicon'
            name='ios-arrow-back'
            containerStyle={styles.controlIconContainer}
            color={this.state.activeCube === 0 ? Colors.gray4 : Colors.gray1}
            onPress={() => this.setState({
              learnedCards: this.state.learnedCards.filter( card => card != this.state.activeCube ),
              stillLearningCards: this.state.stillLearningCards.filter( card => card != this.state.activeCube ),
              activeCube: Math.max(this.state.activeCube - 1, 0),
              hideAnswers: true
            })}
            disabled={this.state.activeCube === 0}
            disabledStyle={styles.disabledIconButtonStyle}
            raised
          />
          <Icon 
            type='ionicon'
            containerStyle={styles.controlIconContainer}
            name={this.state.hideAnswers ? 'ios-eye-off' : 'ios-eye'}
            color={Colors.gray1}
            onPress={() => this.setState({hideAnswers: !this.state.hideAnswers})}
            raised
          />
          <Icon 
            type='ionicon'
            name='ios-refresh'
            containerStyle={styles.controlIconContainer}
            color={this.state.activeCube === 0 ? Colors.gray3 : Colors.gray1}
            onPress={() => this.setState({
              activeCube: 0,
              hideAnswers: true,
              learnedCards: [],
              stillLearningCards: []
            })}
            disabled={this.state.activeCube === 0}
            disabledStyle={styles.disabledIconButtonStyle}
            raised
          />
          <Icon 
            type='ionicon'
            name='ios-arrow-forward'
            containerStyle={styles.controlIconContainer}
            color={this.state.activeCube === currentTower.cubes.length ? Colors.gray3 : Colors.gray1}
            onPress={() => this.setState({
              activeCube: Math.min(this.state.activeCube + 1, currentTower.cubes.length),
              hideAnswers: true,
              stillLearningCards: [...this.state.stillLearningCards, this.state.activeCube]
            })}
            disabled={this.state.activeCube === currentTower.cubes.length}
            disabledStyle={styles.disabledIconButtonStyle}
            raised
          />
        </View>
      </KeyboardAvoidingView>,

      <Animated.View 
        style={[
          styles.toast, 
          styles.rightActionToast,
          {
            opacity: rightToastOpacity,
            zIndex: rightToastZ
          }
        ]} 
        key={3}
      >
        <Icon 
          type='ionicon'
          name='ios-checkmark-circle'
          size={70}
          color={Colors.white}
        />
        <Text style={{...Styles.regularText, color: Colors.white}}>I've got it</Text>
      </Animated.View>,
      <Animated.View 
        style={[
          styles.toast,
          styles.leftActionToast,
          {
            opacity: leftToastOpacity,
            zIndex: leftToastZ
          }
        ]} 
        key={4}
      >
        <Icon 
          type='ionicon'
          name='ios-alert'
          size={70}
          color={Colors.white}
        />
        <Text style={{...Styles.regularText, color: Colors.white}}>I'm still learning</Text>
      </Animated.View>
    ]
  }

  renderFaceInputs(cube) {
    const { baseCategory, learningCategories } = this.props.user.profile.preferences

    let inputArray = []
    const faces = cube.face_set
    .filter(face => face.category != baseCategory)
    .filter(face => learningCategories.includes(face.category))
    .sort((a, b) => {
      let aName = this.getCategoryNameFromId(a.category)
      let bName = this.getCategoryNameFromId(b.category)
      if (aName > bName) return 1
      if (aName < bName) return -1
      return 0
    } )

    return faces.map((face, index) => {
        let label = <View style={styles.faceInputLabel}>
          <Text
            style={{
              ...Styles.xsmallText,
              color: Colors.gray3,
              textTransform: 'uppercase',
              flexBasis: '40%'
            }}
          >{this.getCategoryNameFromId(face.category)}</Text>
          <Text
            style={{
              ...Styles.xsmallText,
              color: Colors.gray2,
              flexBasis: '60%',
              textAlign: 'right'
            }}
          >
            {this.state.hideAnswers ? null : this.state.cubeValues[cube.id][face.id].value }
          </Text>
        </View>

        return <View style={styles.faceContianer} key={index}>
          <View style={styles.faceInputContainer}>
            <Input 
              ref={ input => inputArray[index] = input}
              label={label}
              autoCapitalize='none' 
              labelStyle={{
                ...Styles.xsmallText,
                color: Colors.gray3,
                textTransform: 'uppercase',
              }}
              key={index}
              value={this.state.cubeValues[cube.id][face.id].currentValue}
              onChangeText={(text) => this.handleInputChange(cube.id, face.id, text)}
              blurOnSubmit={false}
              onSubmitEditing={index === faces.length-1
                ? null
                : () => inputArray[index+1].focus()
              }
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

  renderSummary() {

    Animated.timing( this.state.toast, {
      toValue: 0,
      duration: 0
    }).start()

    return <Animated.View style={styles.summaryContainer}>
      <View style={styles.summaryTitle}>
        <Text style={Styles.display2}>Good Work!</Text>
      </View>
      <View style={styles.summaryScores}>
        <View style={styles.summaryScoresRow}>
          <View style={styles.summaryScoresRowIcon}>
            <Icon 
              type='ionicon'
              name='ios-checkmark-circle'
              size={40}
              color={Colors.primary}
            />
          </View>
          <View style={styles.summaryScoresRowText}>
            <Text>
              <Text style={Styles.smallText}>
                You've mastered
              </Text>
              <Text style={Styles.regularSemiBold}>
                {` ${this.state.learnedCards.length} `}
              </Text>
              <Text style={Styles.smallText}>
                terms.
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.summaryScoresRow}>
          <View style={styles.summaryScoresRowIcon}>
            <Icon 
              type='ionicon'
              name='ios-alert'
              size={40}
              color={Colors.secondary}
            />
          </View>
          <View style={styles.summaryScoresRowText}>
          <Text>
              <Text style={Styles.smallText}>
                You're still learning
              </Text>
              <Text style={Styles.regularSemiBold}>
                {` ${this.state.stillLearningCards.length} `}
              </Text>
              <Text style={Styles.smallText}>
                terms.
              </Text>
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.summaryActions}>
        <Button 
          title='Study Again'
          onPress={() => this.setState({
            activeCube: 0,
            hideAnswers: true,
            learnedCards: [],
            stillLearningCards: []
          })}
          buttonStyle={Styles.buttonStyle}
          titleStyle={Styles.buttonTextStyle}
          containerStyle={{ marginBottom: 15 }}
        />
        <Button 
          title='Go Home'
          onPress={() => this.props.navigation.navigate('Home')}
          buttonStyle={Styles.outlineButtonStyle}
          titleStyle={[Styles.outlineButtonTextStyle, {color: Colors.primary}]}
        />
      </View>
    </Animated.View>
  }

  toggleCubeList(cube) {
    const { defaultList } = this.props.user.defaultList

    if (defaultList.cubes.includes(cube)) {
      this.props.removeCubeFromList(cube, defaultList.id)
    } else {
      this.props.addCubeToList(cube, defaultList.id)
    }
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
      <View
        style={styles.container} 
      >
        <TouchableWithoutFeedback onPressIn={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            {this.state.activeCube === currentTower.cubes.length
              ? this.renderSummary()
              : this.renderCardStack()
            }
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
    },
    innerContainer: {
      height: '100%'
    },
    progressContainer: {
      flexBasis: '5%',
      paddingHorizontal: 10,
      paddingTop: 15,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'space-between'
    },
    progressBar: {
      flexBasis: '82%',
      paddingRight: 3
    },
    progressText: {
      ...Styles.xsmallText,
      color: Colors.gray2,
      flexBasis: '8%',
      textAlign: 'center'
    },
    cardContainer: {
      flexBasis: '85%',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    cardTitle: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 10,
      marginBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: Colors.gray3
    },
    cardTitlePadLeft: {
      flexBasis: '7%'
    },
    cardTitleText: {
      ...Styles.mediumSemiBold,
      textAlign: 'center',
      flexBasis: '86%'
    },
    cardTitleIcon: {
      flexBasis: '7%'
    },
    controlContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingBottom: 15
    },
    controlIconContainer: {
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
    faceInputLabel: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      alignContent: 'space-between',
  
    },
    disabledIconButtonStyle: {
      backgroundColor: Colors.white
    },
    toast: {
      ...Styles.shadow,
      opacity: 0.9,
      position: 'absolute',
      zIndex: 10000,
      width: '33%',
      height: 110,
      top: '45%',
      display: 'flex',
      flexDirection: 'column',
      color: Colors.white,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'space-around'
    },
    leftActionToast: {
      backgroundColor: Colors.secondary,
      left: 0,
    },
    rightActionToast: {
      backgroundColor: Colors.primary,
      right: 0,
    },
    summaryContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center'
    },
    summaryScores: {
      paddingVertical: '5%'
    },
    summaryScoresRow: {
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center'
    },
    summaryScoresRowText: {
      display: 'flex',
      flexDirection: 'row'
    }, 
    summaryScoresRowIcon: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      flexBasis: '30%',
      paddingRight: '5%'
    },
    summaryScoresRowText: {
      flexBasis: '70%',
      alignContent: 'flex-start',
    },
    summaryActions: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      paddingHorizontal: '15%'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(WriteScreen)