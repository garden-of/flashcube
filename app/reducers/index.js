import { combineReducers } from 'redux'

import { persistReducer } from 'redux-persist'
import createSecureStore from "redux-persist-expo-securestore"

import userReducer from './user'
import towerReducer from './tower'

const persistConfig = {
    key: 'primary',
    whitelist: ['auth'],
    storage: createSecureStore()
}

const createRootReducer = (history) => combineReducers({
    user: persistReducer(persistConfig, userReducer),
    tower: towerReducer,
})

export default createRootReducer