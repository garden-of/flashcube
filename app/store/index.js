import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'

// MIDDLEWARE
import logger from 'redux-logger'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'

import getEnvVars from '../environment/environment'

import createRootReducer from '../reducers/index'

UNAUTHED_URLS = [
    '/auth/token/',
    '/auth/convert-token/',
    '/register/',
]
const axiosMiddlewareConfig = {
    interceptors: {
        request: [{
          success: function ({getState, dispatch, getSourceAction}, req) {
            
            const token = getState().user.auth.access_token
            
            // special case for when we are refreshing token:
            if (UNAUTHED_URLS.includes(req.url)) {
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
            return error
          }
        }]
    }
}

const { apiUrl } = getEnvVars()
const client = axios.create({
    baseURL: apiUrl,
    responseType: 'json'
})

export const store = createStore(createRootReducer(), applyMiddleware(axiosMiddleware(client, axiosMiddlewareConfig), logger))
export const persistor = persistStore(store)