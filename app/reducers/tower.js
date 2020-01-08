import * as actions from '../actions/tower'

const defaultState = {
    towers: {},
    categories: {}
}

export default function reducer(state = defaultState, action) {
    switch (action.type) {

        // get all categories
        case actions.GET_CATEGORIES:
            return { 
                ...state, 
                categories: {
                    fetching: true,
                    fetched: false
                }
            }
        case actions.GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: {
                    fetched: true,
                    fetching: false,
                    categories: action.payload.data.results
                }
            }
        case actions.GET_CATEGORIES_FAIL:
            return {
                ...state,
                categories: {
                    fetched: false,
                    loadign: false
                }
            }

        // get all towers
        case actions.GET_TOWERS:
            return { 
                ...state,
                towers: {
                    ...state.towers,
                    fetching: true
                }
            }
        case actions.GET_TOWERS_SUCCESS:
            return { 
                ...state,
                towers: {
                    fetching: false,
                    fetched: true,
                    towers: action.payload.data.results
                }
            }
        case actions.GET_TOWERS_FAIL:
            return {
                ...state,
                towers: {
                    fetching: false,
                    fetched: false,
                    error: 'Error while fetching towers'
                }
            }

        // get a specific tower
        case actions.GET_TOWER:
            return { ...state,}
        case actions.GET_TOWER_SUCCESS:
            return { ...state, fetching: false, currentTower: action.payload.data }
        case actions.GET_TOWER_FAIL:
            return {
                ...state,
                fetching: false,
                error: 'Error while fetching tower'
            }

        default:
            return state
    }
}