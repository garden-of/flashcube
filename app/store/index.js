import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import createSecureStore from "redux-persist-expo-securestore"

// MIDDLEWARE
import logger from 'redux-logger'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'

import createRootReducer from '../reducers/index'

const persistConfig = {
    key: 'root',
    whitelist: ['login'],
    storage: createSecureStore()
}

const axiosMiddlewareConfig = {
    interceptors: {
        request: [{
          success: function ({getState, dispatch, getSourceAction}, req) {
            
            const token = getState().user.auth.access_token
            
            // special case for when we are refreshing token:
            if (req.url === '/auth/token/' || req.url === '/auth/convert-token/') {
                return req
            } else {
                return {
                    ...req,
                    headers: {
                        ...req.headers,
                        Authorization: `Bearer ${token}`
                    }
                }
            }
          },
          error: function ({getState, dispatch, getSourceAction}, error) {
            //...
            //console.log(error)
            return error
          }
        }]
    }
}

const client = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    responseType: 'json'
})

const persistedReducer = persistReducer(persistConfig, createRootReducer())

export const store = createStore(persistedReducer, applyMiddleware(axiosMiddleware(client, axiosMiddlewareConfig), logger))
export const persistor = persistStore(store)