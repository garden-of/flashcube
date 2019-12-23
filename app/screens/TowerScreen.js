import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

export default function TowerScreen() {
  return (
    <ScrollView style={styles.container}>
    </ScrollView>
  );
}

TowerScreen.navigationOptions = {
  title: 'Towers',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
