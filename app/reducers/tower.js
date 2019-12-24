import * as actions from '../actions/tower'

export default function reducer(state = { towers: [] }, action) {
    switch (action.type) {

        // get all categories
        case actions.GET_CATEGORIES:
            return { ...state, loading: true };
        case actions.GET_CATEGORIES_SUCCESS:
            return { ...state, loading: false, categories: action.payload.data.results };
        case actions.GET_CATEGORIES_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching categories'
            };

        // get all towers
        case actions.GET_TOWERS:
            return { ...state, loading: true };
        case actions.GET_TOWERS_SUCCESS:
            return { ...state, loading: false, towers: action.payload.data.results };
        case actions.GET_TOWERS_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching towers'
            };

        // get a specific tower
        case actions.GET_TOWER:
            return { ...state, loading: true };
        case actions.GET_TOWER_SUCCESS:
            return { ...state, loading: false, currentTower: action.payload.data };
        case actions.GET_TOWER_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching tower'
            };

        default:
            return state;
    }
}