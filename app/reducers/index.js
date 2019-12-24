import { combineReducers } from 'redux'

import towerReducer from './tower'

const createRootReducer = (history) => combineReducers({
    tower: towerReducer,
})

export default createRootReducer