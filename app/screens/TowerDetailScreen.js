import React from 'react'
import { ScrollView, StyleSheet} from 'react-native'

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