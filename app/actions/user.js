import getEnvVars from '../environment/environment'

const envVars = getEnvVars()

export const ADD_CUBE_TO_LIST = 'ADD_CUBE_TO_LIST'
export const ADD_CUBE_TO_LIST_SUCCESS = 'ADD_CUBE_TO_LIST_SUCCESS'
export const ADD_CUBE_TO_LIST_FAIL = 'ADD_CUBE_TO_LIST_FAIL'

export const CLEAR_AUTH_ERRORS = 'CLEAR_AUTH_ERRORS'

export const CREATE_USER_SUBSCRIPTION = 'CREATE_USER_SUBSCRIPTION'
export const CREATE_USER_SUBSCRIPTION_SUCCESS = 'CREATE_USER_SUBSCRIPTION_SUCCESS'
export const CREATE_USER_SUBSCRIPTION_FAIL = 'CREATE_USER_SUBSCRIPTION_FAIL'

export const DELETE_USER_SUBSCRIPTION = 'DELETE_USER_SUBSCRIPTION'
export const DELETE_USER_SUBSCRIPTION_SUCCESS = 'DELETE_USER_SUBSCRIPTION_SUCCESS'
export const DELETE_USER_SUBSCRIPTION_FAIL = 'DELETE_USER_SUBSCRIPTION_FAIL'

export const GET_DEFAULT_LIST = 'GET_DEFAULT_LIST'
export const GET_DEFAULT_LIST_SUCCESS = 'GET_DEFAULT_LIST_SUCCESS'
export const GET_DEFAULT_LIST_FAIL = 'GET_DEFAULT_LIST_FAIL'

export const GET_USER = 'GET_USER'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAIL = 'GET_USER_FAIL'

export const GET_USER_PREFERENCES = 'GET_USER_PREFERENCES'
export const GET_USER_PREFERENCES_SUCCESS = 'GET_USER_PREFERENCES_SUCCESS'
export const GET_USER_PREFERENCES_FAIL = 'GET_USER_PREFERENCES_FAIL'

export const GET_USER_SUBSCRIPTIONS = 'GET_USER_SUBSCRIPTIONS'
export const GET_USER_SUBSCRIPTIONS_SUCCESS = 'GET_USER_SUBSCRIPTIONS_SUCCESS'
export const GET_USER_SUBSCRIPTIONS_FAIL = 'GET_USER_SUBSCRIPTIONS_FAIL'

export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

export const REGISTER_USER = 'REGISTER_USER'
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL'

export const REMOVE_CUBE_FROM_LIST = 'REMOVE_CUBE_FROM_LIST'
export const REMOVE_CUBE_FROM_LIST_SUCCESS = 'REMOVE_CUBE_FROM_LIST_SUCCESS'
export const REMOVE_CUBE_FROM_LIST_FAIL = 'REMOVE_CUBE_FROM_LIST_FAIL'

export const SIGN_OUT = 'SIGN_OUT'

export const TOGGLE_REGISTRATION = 'TOGGLE_REGISTRATION'

export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE'
export const UPDATE_USER_PROFILE_SUCCESS = 'UPDATE_USER_PROFILE_SUCCESS'
export const UPDATE_USER_PROFILE_FAIL = 'UPDATE_USER_PROFILE_FAIL'

export const UPDATE_USER_PREFERENCES = 'UPDATE_USER_PREFERENCES'
export const UPDATE_USER_PREFERENCES_SUCCESS = 'UPDATE_USER_PREFERENCES_SUCCESS'
export const UPDATE_USER_PREFERENCES_FAIL = 'UPDATE_USER_PREFERENCES_FAIL'


export function addCubeToList(cubeId, listId) {
    return {
        type: ADD_CUBE_TO_LIST,
        payload: {
            cube: cubeId,
            request: {
                url: `/api/editlist/`,
                method: 'PATCH',
                data: {
                    action: 'add',
                    cube: cubeId,
                    list: listId
                }
            }
        }
    }
}

export function clearAuthErrors() {
    return {
        type: CLEAR_AUTH_ERRORS,
        payload: {}
    }
}

export function convertToken(provider, response) {

    let token, social, clientId, clientSecret = null
    if (provider === 'facebook') {
        token = response.token
        clientId = envVars.internalFacebookClientId
        clientSecret = envVars.internalFacebookClientSecret
    } else if (provider === 'google-oauth2') {
        token = response.accessToken
        social = {
            photoUrl: response.user.photoUrl
        }
        clientId = envVars.internalGoogleClientId
        clientSecret = envVars.internalGoogleClientSecret
    }


    return {
        type: LOGIN,
        payload: {
            provider,
            social,
            request: {
                url: `/auth/convert-token/`,
                method: 'POST',
                data: {
                    grant_type: 'convert_token',
                    client_id: clientId ,
                    client_secret: clientSecret,
                    backend: provider,
                    token
                }
            }
        }
    }
}

export function createUserSubscription(setId, userId, categories) {
    return {
        type: CREATE_USER_SUBSCRIPTION,
        payload: {
            request: {
                url: `/api/user_subscription/`,
                method: 'POST',
                data: {
                    user: userId,
                    tower: setId,
                    categories: categories
                }
            }
        }
    }
}

export function deleteUserSubscription(subscription) {
    return {
        type: DELETE_USER_SUBSCRIPTION,
        payload: {
            request: {
                url: `/api/user_subscription/${subscription.id}/`,
                method: 'DELETE'
            },
            id: subscription.id
        }
    }
}

export function getDefaultList() {
    return {
        type: GET_DEFAULT_LIST,
        payload: {
            request: {
                url: `/api/list/`
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

export function getUserSubscriptions() {
    return {
        type: GET_USER_SUBSCRIPTIONS,
        payload: {
            request: {
                url: `/api/user_subscription/`
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
                    client_id: envVars.internalClientId,
                    client_secret: envVars.internalClientSecret,
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

export function removeCubeFromList(cubeId, listId) {
    return {
        type: REMOVE_CUBE_FROM_LIST,
        payload: {
            cube: cubeId,
            request: {
                url: `/api/editlist/`,
                method: 'PATCH',
                data: {
                    action: 'remove',
                    cube: cubeId,
                    list: listId
                }
            }
        }
    }
}

export function refreshTokenSuccess(data) {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            data: data.data
        }
    }
}

export function signOut() {
    return {
        type: SIGN_OUT,
        payload: {}
    }
}

export function toggleRegistration() {
    return {
        type: TOGGLE_REGISTRATION,
        payload: {}
    }
}

export function updateUserProfile(profile) {
    return {
        type: UPDATE_USER_PROFILE,
        payload: {
            request: {
                url: `/api/user/`,
                method: 'PATCH',
                data: {
                    ...profile
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
                url: `/api/user_preferences/${preferences.id}/`,
                method: 'PATCH',
                data: {
                    ...preferences
                }
            }
        }
    }
}