import { combineReducers } from 'redux'

import { persistReducer } from 'redux-persist'
import createSecureStore from "redux-persist-expo-securestore"

import AsyncStorage from '@react-native-community/async-storage'

import configReducer from './config'
import userReducer from './user'
import towerReducer from './tower'

const configPersistConfig = {
    key: 'config',
    storage: AsyncStorage
}

const userPersistConfig = {
    key: 'user',
    whitelist: ['auth', 'profile'],
    storage: AsyncStorage
}

const createRootReducer = (history) => combineReducers({
    config: persistReducer(configPersistConfig, configReducer),
    user: persistReducer(userPersistConfig, userReducer),
    tower: towerReducer,
})

export default createRootReducer