import * as actions from '../actions/config'

const defaultState = {
    locales: {}
}

export default function reducer(state = defaultState, action) {
    switch (action.type) {

        case actions.GET_LOCALES:
            return {
                ...state,
                locales: {
                    ...state.locales,
                    fetching: true,
                    fetched: false,
                    error: false
                }
            }
        case actions.GET_LOCALES_SUCCESS:
            return {
                ...state,
                locales: {
                    ...state.locales,
                    fetching: false,
                    fetched: true,
                    error: false,
                    locales: action.payload.data.results
                }
            }

        case actions.GET_LOCALES_FAIL:
            return {
                ...state,
                locales: {
                    fetching: false,
                    fetched: false,
                    error: true
                }
            }

        default:
            return state
    }
}