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

const env = getEnvVars()

let isRefreshing = false
let failedQueue = []

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
        response: [{
            success: ({getState, dispatch, getSourceAction}, res) => {
                return Promise.resolve(res)
            },
            error: async ({getState, dispatch, getSourceAction}, error) => {

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

                    let refreshToken = getState().user.auth.refresh_token
                    let provider = getState().user.auth.provider

                    let clientId = env.internalClientId
                    let clientSecret = env.internalClientSecret
                    if (provider == 'google-oauth2') {
                        clientId = env.internalGoogleClientId,
                        clientSecret = env.internalGoogleClientSecret
                    }
                    if (provider == 'facebook') {
                        clientId = env.internalFacebookClientId,
                        clientSecret = env.internalFacebookClientSecret
                    }

                    let postData = {
                        grant_type: 'refresh_token',
                        client_id: clientId,
                        client_secret: clientSecret,
                        refresh_token: refreshToken
                    }

                    return new Promise( (resolve, reject) => {
                        axios.post(`${env.apiUrl}/auth/token/`, postData)
                        .then( (data) => {
                            
                            // update the store to have the correct token
                            dispatch(userActions.refreshTokenSuccess(data))

                            originalRequest.headers['Authorization'] = 'Bearer ' + data.data.access_token
                            processQueue(null, data.data.access_token)
                            resolve(axios(originalRequest))
                            
                        }).catch( err => {
                            processQueue(err, null)
                            reject(err)
                        }).then( () => {
                            isRefreshing = false
                        })
                    })
                }

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