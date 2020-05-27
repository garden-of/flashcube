import { combineReducers } from 'redux'

import { persistReducer } from 'redux-persist'
import createSecureStore from "redux-persist-expo-securestore"

import configReducer from './config'
import userReducer from './user'
import towerReducer from './tower'

const configPersistConfig = {
    key: 'config',
    storage: createSecureStore()
}

const userPersistConfig = {
    key: 'user',
    whitelist: ['auth', 'profile'],
    storage: createSecureStore()
}

const createRootReducer = (history) => combineReducers({
    config: persistReducer(configPersistConfig, configReducer),
    user: persistReducer(userPersistConfig, userReducer),
    tower: towerReducer,
})

export default createRootReducer