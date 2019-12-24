import { combineReducers } from 'redux'

import loginReducer from './login'
import towerReducer from './tower'

const createRootReducer = (history) => combineReducers({
    login: loginReducer,
    tower: towerReducer,
})

export default createRootReducer