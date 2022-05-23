export const GET_LOCALES = 'GET_LOCALES'
export const GET_LOCALES_SUCCESS = 'GET_LOCALES_SUCCESS'
export const GET_LOCALES_FAIL = 'GET_LOCALES_FAIL'

export function getLocales() {
    return {
        type: GET_LOCALES,
        payload: {
            request: {
                url: `/api/locale/`
            }
        }
    }
}