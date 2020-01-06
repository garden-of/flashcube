import { combineReducers } from 'redux'

import userReducer from './user'
import towerReducer from './tower'

const createRootReducer = (history) => combineReducers({
    user: userReducer,
    tower: towerReducer,
})

export default createRootReducer