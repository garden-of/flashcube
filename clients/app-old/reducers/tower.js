import * as actions from '../actions/tower'

const defaultState = {
    towers: {},
    categories: {},
    currentTower: {}
}

export default function reducer(state = defaultState, action) {
    switch (action.type) {

        // get all categories
        case actions.GET_CATEGORIES:
            return { 
                ...state, 
                categories: {
                    fetching: true,
                    fetched: false,
                    error: false
                }
            }
        case actions.GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: {
                    fetched: true,
                    fetching: false,
                    error: false,
                    categories: action.payload.data.results
                }
            }
        case actions.GET_CATEGORIES_FAIL:
            return {
                ...state,
                categories: {
                    fetched: false,
                    loading: false,
                    error: true
                }
            }

        // get all towers
        case actions.GET_TOWERS:
            return { 
                ...state,
                towers: {
                    ...state.towers,
                    fetching: true,
                    fetched: false,
                    error: false
                }
            }
        case actions.GET_TOWERS_SUCCESS:
            return { 
                ...state,
                towers: {
                    fetching: false,
                    fetched: true,
                    error: false,
                    towers: action.payload.data.results
                }
            }
        case actions.GET_TOWERS_FAIL:
            return {
                ...state,
                towers: {
                    fetching: false,
                    fetched: false,
                    error: true,
                    errorMessage: 'Error while fetching towers'
                }
            }

        // get a specific tower
        case actions.GET_TOWER_CUBES:
            return {
                ...state,
                currentTower: {
                    tower: action.payload.tower,
                    fetching: true,
                    fetched: false,
                    error: false
                }
            }
        case actions.GET_TOWER_CUBES_SUCCESS:
            return { 
                ...state, 
                currentTower: {
                    ...state.currentTower,
                    fetched: true,
                    fetching: false,
                    error: false, 
                    cubes: action.payload.data.results
                }
            }
        case actions.GET_TOWER_CUBES_FAIL:
            return {
                ...state,
                fetched: false,
                fetching: false,
                error: true,
                errorMessage: 'Error while fetching tower'
            }

        default:
            return state
    }
}