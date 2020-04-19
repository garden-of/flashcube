import * as actions from '../actions/user'

const defaultStore = {
    auth: {},
    registration: { isRegeitering: true },  // show the registration screen by default, change to show login instead
    profile: {},
    subscriptions: {}
}

const handleApiError = error => {
    if (error.response.status == 401) {
        return defaultStore
    }
}

export default function reducer(state=defaultStore, action) {
    switch (action.type) {
        case actions.CLEAR_AUTH_ERRORS: {
            return {
                ...state,
                auth: {
                    ...state.auth,
                    error: false
                }
            }
        }
        case actions.CREATE_USER_SUBSCRIPTION: {

            let newSubscriptions = []
            if (state.subscriptions.subscriptions !== undefined){
                newSubscriptions = state.subscriptions.subscriptions
                    .filter(subscription => subscription.tower !== action.payload.request.data.setId)
            }
            newSubscriptions.push({
                user: action.payload.request.data.user,
                tower: action.payload.request.data.tower,
                categories: action.payload.request.data.categories
            })

            return {
                ...state,
                subscriptions: {
                    ...state.subscriptions,
                    error: false,
                    subscriptions: newSubscriptions
                }
            }
        }
        case actions.CREATE_USER_SUBSCRIPTION_SUCCESS: {
            
            const newSubscriptions = state.subscriptions.subscriptions
                .filter(subscription => subscription.tower != action.payload.data.tower)
                
            newSubscriptions.push(action.payload.data)

            return {
                ...state,
                subscriptions: {
                    fetching: false,
                    fetched: true,
                    error: false,
                    subscriptions: newSubscriptions
                }
            }
        }
        case actions.CREATE_USER_SUBSCRIPTION_FAIL: {

            return {
                ...state,
                subscriptions: {
                    fetching: false,
                    fetched: true,
                    error: true
                }
            }
        }
        case actions.DELETE_USER_SUBSCRIPTION: {
            return {
                ...state,
                subscriptions: {
                    ...state.subscriptions,
                    subscriptions: state.subscriptions.subscriptions.filter(s => s.id !== action.payload.id)
                }
            }
        }
        case actions.GET_USER:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    fetching: true,
                    fetched: false,
                    error: false
                }
            }
        case actions.GET_USER_SUCCESS:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    ...action.payload.data,
                    fetching: false,
                    fetched: true,
                    error: false
                }
            }
        case actions.GET_USER_FAIL: 
            return handleApiError(action.error)
        case actions.GET_USER_PREFERENCES:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    preferences: {
                        ...state.profile.preferences,
                        fetching: true,
                        fetched: false,
                        error: false
                    }
                }
            }
        case actions.GET_USER_PREFERENCES_SUCCESS:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    preferences: {
                        ...state.profile.preferences,
                        ...action.payload.data.results[0],
                        fetching: false,
                        fetched: true,
                        error: false
                    }
                }
            }
        case actions.GET_USER_PREFERENCES_FAIL:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    preferences: {
                        ...state.profile.preferences,
                        fetching: false,
                        fetched: false,
                        error: true
                    }
                }
            }
        case actions.GET_USER_SUBSCRIPTIONS:
            return {
                ...state,
                subscriptions: {
                    ...state.subscriptions,
                    fetching: true,
                    fetched: false,
                    error: false
                }
            }
        case actions.GET_USER_SUBSCRIPTIONS_SUCCESS:
            return {
                ...state,
                subscriptions: {
                    ...state.subscriptions,
                    fetched: true,
                    fetching: false,
                    error: false,
                    subscriptions: action.payload.data.results
                }
            }
        case actions.GET_USER_SUBSCRIPTIONS_FAIL:
            return {
                ...state,
                subscriptions: {
                    ...state.subscriptions,
                    fetched: false,
                    fetching: false,
                    error: true
                }
            }
        case actions.LOGIN:
            return {
                ...state,
                auth: {
                    ...state.user,
                    isLoggingIn: true,
                    isLoggedIn: false,
                    provider: action.payload.provider
                }
            }
        case actions.LOGIN_SUCCESS:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    ...action.payload.data,
                    isLoggingIn: false,
                    isLoggedIn: true,
                    error: false
                }
            }
        case actions.LOGIN_FAIL:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    isLoggedIn: false,
                    isLoggingIn: false,
                    error: true,
                    errors: action.error.response.data

                }
            }
        case actions.REGISTER_USER:
            return {
                ...state,
                registration: {
                    isRegistered: false,
                    isRegestering: true,
                    error: false
                },
                profile: {
                    ...state.profile,
                    password: action.payload.request.data.password
                }
            }
        case actions.REGISTER_USER_SUCCESS:    
            return {
                ...state,
                registration:{
                    ...state.registration,
                    isRegistered: true,
                    isRegestering: false,
                    error: false,
                    errors: null
                },
                profile: {
                    ...state.profile,
                    username: action.payload.data.username,
                    email: action.payload.data.email
                }
            }
        case actions.REGISTER_USER_FAIL:
            if (action.error.response.status === 400) {
                return {
                    ...state,
                    registration: {
                        ...state.registration,
                        isRegistered: false,
                        isRegestering: false,
                        error: true,
                        errors: action.error.response.data
                    }
                }
            }
            return {
                ...state,
                registration: {
                    ...state.registration,
                    isRegistered: false,
                    isRegestering: false,
                    error: true
                }
            }
        case actions.SIGN_OUT:
            return defaultStore
        case actions.UPDATE_USER_PREFERENCES:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    preferences: {
                        ...state.profile.preferences,
                        ...action.payload.request.data,
                        fetching: true,
                        fetched: false,
                        error: false
                    }
                }
            }
        case actions.TOGGLE_REGISTRATION:
            return {
                ...state,
                registration: {
                    ...state.registration,
                    isRegistering: !state.registration.isRegistering
                }
            }
        case actions.UPDATE_USER_PREFERENCES_SUCCESS:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    preferences: {
                        ...state.profile.preferences,
                        ...action.payload.data,
                        fetching: false,
                        fetched: true,
                        error: false
                    }
                }
            }
        case actions.UPDATE_USER_PREFERENCES_FAIL:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    preferences: {
                        ...state.profile.preferences,
                        fetching: false,
                        fetched: false,
                        error: true
                    }
                }
            }
        default:
            return state
    }
}