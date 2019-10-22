import React from 'react'
import {
  ScrollView,
  StyleSheet,
} from 'react-native'


import { Card } from 'react-native-elements'
import TowerListContainer from '../containers/TowerListContainer'

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>

      <Card title="Your Towers" style={styles.cardStyle}>
        <TowerListContainer />
      </Card>

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