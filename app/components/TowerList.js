import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { listTowers } from '../reducers.js'

class TowerList extends Component {
    componentDidMount() {
        this.props.listTowers()
    }

    renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text>{item.name}</Text>
        </View>
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
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    }
})

const mapStateToProps = state => {
    console.log(state)
    let storedTowers = state.towers.map(tower => ({ key: String(tower.id), ...tower}))
    return {
        towers: storedTowers
    }
}

const mapDispatchToProps = {
    listTowers
}

export default connect(mapStateToProps, mapDispatchToProps)(TowerList)