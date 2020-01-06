export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS'
export const GET_CATEGORIES_FAIL = 'GET_CATEGORIES_FAIL'
export const GET_TOWERS = 'GET_TOWERS'
export const GET_TOWERS_SUCCESS = 'GET_TOWERS_SUCCESS'
export const GET_TOWERS_FAIL = 'GET_TOWERS_FAIL'
export const GET_TOWER = 'GET_TOWER'
export const GET_TOWER_SUCCESS = 'GET_TOWER_SUCCESS'
export const GET_TOWER_FAIL = 'GET_TOWER_FAIL'

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