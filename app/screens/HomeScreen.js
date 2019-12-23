import React from 'react'
import {
  ScrollView,
  StyleSheet,
} from 'react-native'


export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
    </ScrollView>
  )
}

HomeScreen.navigationOptions = {
  title: 'Welcome to Flashcube',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  cardStyle: {
    maxHeight: 100
  }
})