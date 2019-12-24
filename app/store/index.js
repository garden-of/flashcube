import { createStore, applyMiddleware } from 'redux'

// MIDDLEWARE
import logger from 'redux-logger'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'

import createRootReducer from '../reducers/index'

const client = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    responseType: 'json'
  })

  export const store = createStore(createRootReducer(), applyMiddleware(axiosMiddleware(client), logger))