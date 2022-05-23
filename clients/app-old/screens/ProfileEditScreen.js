import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as Analytics from 'expo-firebase-analytics'

import { View, StyleSheet, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, FlatList, Picker } from 'react-native'
import { Button, Input, ListItem, SearchBar, Image, Icon } from 'react-native-elements'

import * as ImagePicker from 'expo-image-picker'
import { Camera } from 'expo-camera'
import Constants from 'expo-constants'

import * as actions from '../actions/user'

import Styles from '../constants/Styles'
import Colors from '../constants/Colors'

const mapStateToProps = state => ({
  ...state
})
  
const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch)
}

class ProfileEditScreen extends React.Component {
  
  constructor(props) {
    super(props)

    const module = this.props.navigation.getParam('module')
    const field = this.props.navigation.getParam('field')
    
    if (module === 'preferences') {
        this.state = {
            value: this.props.user.profile.preferences[field],
            initialValue: this.props.user.profile.preferences[field],
            categorySearch: ''
        }
    } else {
        this.state = {
            value: this.props.user.profile[field],
            initialValue: this.props.user.profile[field]
        }
    }

    this.handleLearningCategoryChange = this.handleLearningCategoryChange.bind(this)
    this.pickImage = this.pickImage.bind(this)
    this.renderCategorySelector = this.renderCategorySelector.bind(this)
    this.renderInput = this.renderInput.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
  }

  handleLearningCategoryChange(category) {
    if (this.state.value.includes(category)) {
      this.setState({
        value: this.state.value.filter( c => c !== category )
      })
    } else {
      this.setState({
        value: [...this.state.value, category]
      })
    }
  }

  async uploadImage() {
      
    let uriParts = this.state.value.split('.')
    let fileType = uriParts[uriParts.length - 1]

    let formData = new FormData()
    formData.append('profile_image', {
        uri: this.state.value,
        name: `photo.${fileType}`,
        type: `image/${fileType}`
    })

    this.props.uploadProfileImage(
        this.props.user.profile.preferences.id,
        formData
    )
    
  }

  async takePicture() {
    
    if (Constants.platform.ios) {
        const { status } = await ImagePicker.requestCameraPermissionsAsync()
        if (status !== 'granted') {
            alert('Please grant Camera permissions in Settings to access this feature.')
            return
        }
    }
    let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEdit: true,
        aspect: [1, 1],
        quality: 1
    })

    if (!result.cancelled) {
        this.setState({ value: result.uri })
    }

  }

  async pickImage() {

    if (Constants.platform.ios) {
        const { status } = await ImagePicker.requestCameraPermissionsAsync()
        if (status !== 'granted') {
            alert('Please grant Camera permissions in Settings to access this feature.')
            return
        }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEdit: true,
        aspect: [1, 1],
        quality: 1
    })

    if (!result.cancelled) {
        this.setState({ value: result.uri })
    }
  }

  renderCategorySelector(item) {
    const category = item.item

    return <ListItem 
      containerStyle={Styles.listItemContainer}
      title={category.category}
      titleStyle={Styles.regularText}
      switch={{
        trackColor: {true: Colors.primary},
        value: this.state.value.includes(category.id),
        onChange: () => this.handleLearningCategoryChange(category.id)
      }}
    />
  }

  renderInput(module, field, input) {

    const { profile } = this.props.user
    const { categories } = this.props.tower.categories

    if (field === 'baseCategory') {
        return <Picker
            selectedValue={this.state.value}
            onValueChange={value => this.setState({ value })}
        >
            {this.props.tower.categories.categories.map( (c, index) => <Picker.Item 
                label={c.category}
                value={c.id}
                key={index}
            />)}
        </Picker>
    }
    if (field === 'learningCategories') {
        return <View style={styles.categoryPicker}>
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
            <View style={styles.listContainer}>
                <FlatList 
                    keyExtractor={(item, index) => index.toString()}
                    data={categories.filter( c => c.category.toLowerCase().includes(this.state.categorySearch.toLowerCase()))}
                    renderItem={this.renderCategorySelector}
                />
            </View>
        </View>
    }
    if (field === 'profile_image') {

        return <View style={styles.categoryPicker}>
            <Image 
                source={{ uri: this.state.value }}
                style={{ width: 250, height: 250 }}
            />
            <View style={styles.imageActions}>
                <Icon 
                    type='ionicon'
                    name='ios-camera'
                    color={Colors.primary}
                    size={20}
                    onPress={this.takePicture}
                    reverse
                />
                <Button 
                    title='Pick an image'
                    buttonStyle={Styles.buttonStyle}
                    titleStyle={Styles.buttonTextStyle} 
                    containerStyle={{...Styles.buttonContainerStyle, ...Styles.verticalPad, flex: 1}}
                    onPress={this.pickImage}
                />
            </View>
        </View>
    }

    return <Input 
        value={this.state.value}
        onChangeText={t => this.setState({ value: t })}
        autoFocus={true}
        errorMessage={this.state.errorMessage}
    />

  }

  saveValue() {

    const module = this.props.navigation.getParam('module')
    const field = this.props.navigation.getParam('field')

    if (field === 'profile_image') {
        this.uploadImage().then(() => {
            if (this.props.user.profile.preferences.updateError) {
                this.setState({errorMessage: this.props.user.profile.preferences.updateErrorMessage[field][0]})
            } else {
                this.setState({errorMessage: null})
                this.props.navigation.goBack()
            }
        }
    )
    } else if (module === 'preferences') {
        this.props.updateUserPreferences({
            id: this.props.user.profile.preferences.id,
            [field]: this.state.value
        }).then(() => {
                if (this.props.user.profile.preferences.updateError) {
                    this.setState({errorMessage: this.props.user.profile.preferences.updateErrorMessage[field][0]})
                } else {
                    this.setState({errorMessage: null})
                    this.props.navigation.goBack()
                }
            }
        )
    } else if (module === 'profile') {
        this.props.updateUserProfile({
            [field]: this.state.value
        }).then(() => {
            if (this.props.user.profile.updateError) {
                this.setState({errorMessage: this.props.user.profile.updateErrorMessage[field][0]})
            } else {
                this.setState({errorMessage: null})
                this.props.navigation.goBack()
            }
        })
    }

  }

  render() {

    const { navigation } = this.props

    const inputType = navigation.getParam('input', 'text')
    const module = navigation.getParam('module')
    const field = navigation.getParam('field')
    const title =  navigation.getParam('title', `${field.charAt(0).toUpperCase() + field.slice(1)}`)

    return <KeyboardAvoidingView 
        style={styles.container}
        behavior={'height'}
    >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
                <View style={styles.header}>
                    <Text style={Styles.mediumSemiBold}>{title}</Text>
                </View>
                <View style={styles.content}>
                    {this.renderInput(module, field, inputType)}
                </View>
                <View style={styles.actions}>
                    <Button 
                        title='Save'
                        buttonStyle={Styles.buttonStyle}
                        titleStyle={Styles.buttonTextStyle} 
                        containerStyle={{...Styles.buttonContainerStyle, ...Styles.verticalPad}}
                        onPress={() => this.saveValue()}
                        disabled={this.state.value == this.state.initialValue}
                    />
                    <Button 
                        title='Cancel'
                        buttonStyle={{...Styles.invertedButtonStyle, backgroundColor: Colors.gray6 }}
                        titleStyle={Styles.invertedButtonTextStyle} 
                        containerStyle={Styles.buttonContainerStyle}
                        onPress={() => this.props.navigation.goBack()}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    display: 'flex',
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    padding: 10,
    paddingTop: 70,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    
  },    
  content: {
    flex: 1,
    justifyContent: 'center'
  },
  categoryPicker: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center'
  },
  imageActions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
    padding: 5
  },    
  listContainer: {
    flex: 1,
    zIndex: 100
  }, 
  actions: {
    
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditScreen)