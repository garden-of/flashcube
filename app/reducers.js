export const API_BASE = '127.0.0.1:8000/api/'

export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS'
export const GET_CATEGORIES_FAIL = 'GET_CATEGORIES_FAIL'
export const GET_TOWERS = 'GET_TOWERS'
export const GET_TOWERS_SUCCESS = 'GET_TOWERS_SUCCESS'
export const GET_TOWERS_FAIL = 'GET_TOWERS_FAIL'
export const GET_TOWER = 'GET_TOWER'
export const GET_TOWER_SUCCESS = 'GET_TOWER_SUCCESS'
export const GET_TOWER_FAIL = 'GET_TOWER_FAIL'

export default function reducer(state = { towers: [] }, action) {
    switch (action.type) {

        // get all categories
        case GET_CATEGORIES:
            return { ...state, loading: true };
        case GET_CATEGORIES_SUCCESS:
            return { ...state, loading: false, categories: action.payload.data.results };
        case GET_CATEGORIES_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching categories'
            };

        // get all towers
        case GET_TOWERS:
            return { ...state, loading: true };
        case GET_TOWERS_SUCCESS:
            return { ...state, loading: false, towers: action.payload.data.results };
        case GET_TOWERS_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching towers'
            };

        // get a specific tower
        case GET_TOWER:
            return { ...state, loading: true };
        case GET_TOWER_SUCCESS:
            return { ...state, loading: false, currentTower: action.payload.data };
        case GET_TOWER_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching tower'
            };

        default:
            return state;
    }
}

export function listTowers() {
    return {
        type: GET_TOWERS,
        payload: {
            request: {
                url: `/api/tower/`
            }
        }
    }
}

export function getTower(tower) {
    return {
        type: GET_TOWER,
        payload: {
            request: {
                url: `/api/tower/${tower}`
            }
        }
    }
}

export function getCategories(categories) {
    return {
        type: GET_CATEGORIES,
        payload: {
            request: {
                url: `/api/category/`
            }
        }
    }
}