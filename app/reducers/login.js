import * as actions from '../actions/login'

export default function reducer(state = {user: {}}, action) {
    switch (action.type) {
        case actions.LOGIN:
            return {
                ...state,
                user: {
                    ...state.user,
                    isLoggingIn: true,
                    isLoggedIn: false
                }
            }
        case actions.LOGIN_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload.data,
                    isLoggingIn: false,
                    isLoggedIn: true
                }
            }
        case actions.LOGIN_FAIL:
            return {
                ...state,
                user: {
                    ...state.user,
                    isLoggedIn: false,
                    isLoggingIn: false,
                    error: true,
                    errors: action.error.response.data

                }
            }
        case actions.REGISTER_USER:
            return {
                ...state,
                user: {
                    isRegistered: false,
                    isRegestering: true,
                    password: action.payload.request.data.password
                }
            }
        case actions.REGISTER_USER_SUCCESS:    
            return {
                ...state,
                user:{
                    ...state.user,
                    isRegistered: true,
                    isRegestering: false,
                    error: false,
                    errors: null,
                    username: action.payload.data.username,
                    email: action.payload.data.email
                }
            }
        case actions.REGISTER_USER_FAIL:
            if (action.error.response.status === 400) {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        isRegistered: false,
                        isRegestering: false,
                        error: true,
                        errors: action.error.response.data
                    }
                }
            }
            return {
                ...state,
                user: {
                    ...state.user,
                    isRegistered: false,
                    isRegestering: false,
                    error: true
                }
            }
        default:
            return state
    }
}