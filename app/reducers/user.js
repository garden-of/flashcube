import * as actions from '../actions/user'

const defaultStore = {
    auth: {},
    registration: {},
    profile: {}
}

export default function reducer(state=defaultStore, action) {
    switch (action.type) {
        case actions.GET_USER:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    fetching: true,
                    fetched: false
                }
            }
        case actions.GET_USER_SUCCESS:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    ...action.payload.data,
                    fetching: false,
                    fetched: true
                }
            }
        case actions.GET_USER_FAIL:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    fetching: false,
                    fetched: false
                }
            }
        case actions.GET_USER_PREFERENCES:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    preferences: {
                        ...state.profile.preferences,
                        fetching: true,
                        fetched: false
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
                    }
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
                    isLoggedIn: true
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
        case actions.UPDATE_USER_PREFERENCES:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    preferences: {
                        ...state.profile.preferences,
                        fetching: true,
                        fetched: false
                    }
                }
            }
        case actions.UPDATE_USER_PREFERENCES_SUCCESS:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    preferences: {
                        ...state.profile.preferences,
                        ...action.payload.data.results[0],
                        fetching: false,
                        fetched: true,
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
                    }
                }
            }
        default:
            return state
    }
}