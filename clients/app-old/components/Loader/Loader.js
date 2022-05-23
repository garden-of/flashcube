import React from 'react'
import PropTypes from 'prop-types'

import { Motion, spring } from 'react-motion'
import { View, StyleSheet, Text, Picker } from 'react-native'

import Colors from '../../constants/Colors'
import Styles from '../../constants/Styles'
import { connect } from 'react-redux'

class Cube extends React.Component {

    constructor(props) {
        super(props)

        const { index = 'front', size = 100 } = this.props
        const faceSize = size

        this.state = {
            index,
            isMoved: false,
            cube: {
                width: size,
                height: size,
                translate: { x: 0, y: 0, z: 0 },
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0,
            },
            faces: {
                front: {
                    text: 'front',
                    translate: { x: 0, y: 0, z: 0 },
                    rotate: { x: 0, y: '0deg', z: 0},
                    color: Colors.primary
                },
                right: {
                    text: 'right',
                    translate: { x: faceSize, y: -faceSize, z: 0 },
                    rotate: { x: 0, y: '90deg', z: 0},
                    color: Colors.primary
                },
                back: {
                    text: 'back',
                    translate: { x: 0, y: 0, z: 0},
                    rotate: { x: 0, y: '180deg', z: 0, deg: 0 },
                    color: Colors.primary
                },
                left: {
                    text: 'left',
                    translate: { x: -faceSize, y: -faceSize*3, z: 0 },
                    rotate: { x: 0, y: '-90deg', z: 0, deg: 0 },
                    color: Colors.primary
                },
                top: {
                    text: 'top',
                    translate: { x: 0, y: -faceSize*5, z: 0 },
                    rotate: { x: '90deg', y: 0, z: 0, deg: 0 },
                    color: Colors.primary
                },
                bottom: {
                    text: 'bottom',
                    translate: { x: 0, y: -faceSize*4, z: 0 },
                    rotate: { x: '-90deg', y: 0, z: 0, deg: 0 },
                    color: Colors.primary
                }
            }
        }

        this.renderFaces = this.renderFaces.bind(this)
    }

    renderFaces() {

        const { cube, faces } = this.state

        return Object.keys(faces).map((face, index) => {
            const { translate, rotate, perspective, color, text } = faces[face]
            return <View
                key={index}
                style={{
                    ...styles.face,
                    transform: [
                        //{ translateX: translate.x},
                        //{ translateY: translate.y},
                        { rotateX: rotate.x },
                        { rotateY: rotate.y },
                        { rotateY: rotate.y },
                    ],
                    width: cube.width,
                    height: cube.height,
                    backgroundColor: color,
                  }}
            >
                <Text>{text}</Text>
            </View>
        })
    }

    render() {
        const { cube, faces, children } = this.state

        return <View
            style={{
                ...styles.cube,
                transform: [
                    { translateX: cube.translate.x},
                    { translateY: cube.translate.y},
                    { rotateX: cube.rotateX },
                    { rotateY: cube.rotateY }
                ]
            }}
            >
            {this.renderFaces()}
        </View>
    }
}

class Loader extends React.Component {

    constructor(props) {
        super(props)
    }

    render(){
        return <View style={styles.container}>
            <Cube />
        </View>
    }
}

Loader.proptypes = {
}

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 100,
        transform: [
            { perspective: 600 }
        ]
    },
    cube: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    face: {
        position: 'absolute',
        width:100,
        height: 100,
        backgroundColor: Colors.primary,
        borderColor: Colors.black,
        borderWidth: 1,
        opacity: 0.1
    }
})

export default Loader