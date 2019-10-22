import React from 'react';
import { ScrollView, StyleSheet} from 'react-native';

import TowerDetailContainer from '../containers/TowerDetailContainer'

export default class DetailsScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("towerName", "")
    };
  };

  render() {
    const { navigation } = this.props
    this.navigationOptions = {
      title: this.props.title
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>
          <TowerDetailContainer 
            towerId={navigation.getParam("towerId", "")}
          />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: "center"
},
})