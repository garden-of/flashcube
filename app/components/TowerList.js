import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { ListItem } from 'react-native-elements'

import Colors from '../constants/Colors'

class TowerList extends Component {
    componentDidMount() {
        this.props.listTowers()
    }

    renderItem = ({ item }) => (
        <ListItem 
            key={item.key}
            title={item.name}
            badge={{ value: item.num_cubes, badgeStyle: styles.badgeStyle}}
            bottomDivider
            chevron
            onPress={() => this.props.navigation.navigate('TowerDetailScreen', { towerId: item.key, towerName: item.name })}
        />
    )

    render() {
        const { towers } = this.props
        return (
            <FlatList
                styles={styles.container}
                data={towers}
                renderItem={this.renderItem}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    badgeStyle: {
        backgroundColor: Colors.primary
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    }
})

export default withNavigation(TowerList)