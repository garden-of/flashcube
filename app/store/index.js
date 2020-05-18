import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'

// MIDDLEWARE
import logger from 'redux-logger'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'

import * as userActions from '../actions/user'

import getEnvVars from '../environment/environment'

import createRootReducer from '../reducers/index'

UNAUTHED_URLS = [
    '/auth/token/',
    '/auth/convert-token/',
    '/register/',
]

const envVars = getEnvVars()

let isRefreshing = false
let failQueue = []

const processQueue = (error, token=null) => {
    failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    })
    
    failedQueue = [];
}

const axiosMiddlewareConfig = {
    interceptors: {
        request: [{
          success: ({getState, dispatch, getSourceAction}, req) => {
            
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
          error: ({getState, dispatch, getSourceAction}, error) => {
            //...
            return error
          }
        }],
        response: {
            success: ({getState, dispatch, getSourceAction}, res) => {
                return Promise.resolve(res)
            },
            error: async ({getState, dispatch, getSourceAction}, error) => {

                console.log(error)
                const originalRequest = error.config

                if (error.response.status === 401 && !originalRequest._retry) {

                    if (isRefreshing) {
                        try {
                            const token = await new Promise((resolve, reject) => {
                                failedQueue.push({ resolve, reject })
                            })
                            originalRequest.headers['Authorization'] = `Bearer ${token}`
                            return axios(originalRequest)
                        }
                        catch (err) {
                            return Promise.reject(err)
                        }
                    }
                    
                    originalRequest._retry = true
                    isRefreshing = true

                    const refreshToken = getState().user.auth.refresh_token
                    return new Promise( (resolve, reject) => {
                        axios.post(`${env.apiUrl}/auth/token/`, {
                            grant_type: 'refresh_token',
                            client_id: env.internalClientId,
                            client_secret: env.internalClientSecret,
                            refresh_token: refreshToken
                        }).then( (data) => {
                            console.log(data)
                        }).catch( err => {
                            processQueue(err, null)
                            reject(err)
                        }).then( () => {
                            isRefreshing = false
                        })
                    })
                }

            }
        }
    }
}

const { apiUrl } = getEnvVars()
const client = axios.create({
    baseURL: apiUrl,
    responseType: 'json'
})

export const store = createStore(createRootReducer(), applyMiddleware(axiosMiddleware(client, axiosMiddlewareConfig), logger))
export const persistor = persistStore(store)