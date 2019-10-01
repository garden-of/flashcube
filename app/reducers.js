export const API_BASE = '127.0.0.1:8000/api/'

export const GET_TOWERS = 'flashcube/towers/LOAD'
export const GET_TOWERS_SUCCESS = 'flashcube/towers/LOAD_SUCCESS'
export const GET_TOWERS_FAIL = 'flashcube/towers/LOAD_FAIL'

export default function reducer(state = { towers: [] }, action) {
    switch (action.type) {
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