import getEnvVars from '../environment/environment'

const envVars = getEnvVars()

export const GET_USER = 'GET_USER'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAIL = 'GET_USER_FAIL'

export const GET_USER_PREFERENCES = 'GET_USER_PREFERENCES'
export const GET_USER_PREFERENCES_SUCCESS = 'GET_USER_PREFERENCES_SUCCESS'
export const GET_USER_PREFERENCES_FAIL = 'GET_USER_PREFERENCES_FAIL'

export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

export const REGISTER_USER = 'REGISTER_USER'
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL'

export const UPDATE_USER_PREFERENCES = 'UPDATE_USER_PREFERENCES'
export const UPDATE_USER_PREFERENCES_SUCCESS = 'UPDATE_USER_PREFERENCES_SUCCESS'
export const UPDATE_USER_PREFERENCES_FAIL = 'UPDATE_USER_PREFERENCES_FAIL'

const INTERNAL_CLIENT_ID = envVars.internalClientId
const INTERNAL_CLIENT_SECRET = envVars.internalClientSecret

export function convertToken(provider, response) {
    
    let token = null
    if (provider === 'facebook') {
        token = response.token
    } else if (provider === 'google-oauth2') {
        token = response.accessToken
    }

    return {
        type: LOGIN,
        payload: {
            provider,
            request: {
                url: `/auth/convert-token/`,
                method: 'POST',
                data: {
                    grant_type: 'convert_token',
                    client_id: INTERNAL_CLIENT_ID,
                    client_secret: INTERNAL_CLIENT_SECRET,
                    backend: provider,
                    token
                }
            }
        }
    }
}

export function getUser() {
    return {
        type: GET_USER,
        payload: {
            request: {
                url: `/api/user/`
            }
        }
    }
}

export function getUserPreferences() {
    return {
        type: GET_USER_PREFERENCES,
        payload: {
            request: {
                url: `/api/user_preferences/`
            }
        }
    }
}

export function loginUser(username, password) {
    return {
        type: LOGIN,
        payload: {
            provider: 'internal',
            request:{
                url: `/auth/token/`,
                method: 'POST',
                data: {
                    username,
                    password,
                    client_id: INTERNAL_CLIENT_ID,
                    client_secret: INTERNAL_CLIENT_SECRET,
                    grant_type: 'password'
                }
            }
        }
    }
}

export function registerUser(email, password) {
    return {
        type: REGISTER_USER,
        payload: {
            request: {
                url: `/register/`,
                method: 'POST',
                data: {
                    username: email,
                    email: email,
                    password: password
                }
            }
        }
    }
}

export function updateUserPreferences(preferences) {
    return {
        type: UPDATE_USER_PREFERENCES,
        payload: {
            request: {
                url: `/api/user_preferences/`,
                method: 'PUT',
                data: {
                    id: preferences.id,
                    baseCategory: preferences.baseCategory,
                    learningCategories: preferences.learningCategories,
                    fluentCategories: preferences.fluentCategories
                }
            }
        }
    }
}