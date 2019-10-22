import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'
import { View } from 'react-native'
import { Text, Button, colors } from 'react-native-elements'
import ProgressCircle from 'react-native-progress-circle'

import Colors from '../constants/Colors'
import { LoadingSpinner } from './LoadingSpinner'
import Styles from '../constants/Styles'

class TowerDetail extends Component {

    static defaultProps = {
        categories: []
    }

    componentDidMount() {
        this.props.getTower(this.props.towerId)
        this.props.getCategories()
    }

    renderCategories() {
        const { categories } = this.props
        return categories.map(category => <Text key={category.id} style={styles.categoryBadge}>{category.category}</Text>)
    }

    render() {
        const { tower, loading, categories } = this.props

        if(loading) {
            return (
                <View style={styles.loadingContainer}>
                    <LoadingSpinner />
                </View>
            )
        }
        else{

            let progress = Math.round(tower.num_cubes * .3)

            return ( 
                <View style={styles.loadedContainer}>
                    <View style={styles.cubesSummary}>
                        <ProgressCircle
                            percent={30}
                            radius={140}
                            borderWidth={30}
                            color={Colors.primary}
                            shadowColor={Colors.tintColor}
                            bgColor={Colors.white}
                            containerStyle={styles.progressCircleContainer}
                        >
                            <Text style={styles.cubesSummaryText}>
                                You've mastered <Text style={styles.highlight}>{progress}</Text> of <Text style={styles.highlight}>{tower.num_cubes}</Text> cubes!
                            </Text>
                        </ProgressCircle>
                    </View>
                    <View style={styles.categoriesSummary}>
                        <View style={styles.categoriesLabel}><Text style={styles.categoriesLabelText}>In This Tower:</Text></View>
                        <View style={styles.categoriesList}>{this.renderCategories()}</View>
                    </View>
                    <View style={styles.actionsPane}>
                        <Button containerStyle={Styles.buttonContainerStyles} buttonStyle={Styles.outlineButtonStyle} titleStyle={Styles.outlineButtonTextStyle} title="Favorite" type="outline"/>
                        <Button containerStyle={Styles.buttonContainerStyles} buttonStyle={Styles.buttonStyle} title="Practice"/>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center"
    },
    loadedContainer: {
        flex: 1,
        justifyContent: "flex-start"
    },
    cubesSummary: {
        flex: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    cubesSummaryText: {
        fontSize: 18,
        padding: 10,
        color: Colors.gray1
    },
    categoriesSummary: {
        flex: 2
    },
    categoriesLabel: {
        marginLeft: 10,
        flex: 1
    },
    categoriesLabelText: {
        color: Colors.gray1,
        fontSize: 14,
    },
    categoryBadge: {
        backgroundColor: Colors.primary,
        color: Colors.white,
        margin: 5,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.primary,
        overflow: "hidden",
        fontSize: 18,
    },
    categoriesList: {
        flex: 10,
        alignItems: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 10
    },
    actionsPane: {
        flex: 2,
        justifyContent: "flex-end",
        paddingBottom: 5
    },
    progressCircleContainer: {
    },
    highlight: {
        color: Colors.primary,
        fontSize: 20,
        fontWeight: "bold"
    }
})

export default withNavigation(TowerDetail);
