
export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

export const REGISTER_USER = 'REGISTER_USER'
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL'

const INTERNAL_CLIENT_ID = 'xY3XF1gjEsNXLtz63MDtljNB2sXASqFl1tVI8D2s'
const INTERNAL_CLIENT_SECRET = 'qBgnejmCZbHrX7pOfhFbkubuBzNpzmv0Bpjfnv34tb3Z6ZX3e9CQmC7lDcOqQtnE1I3JipCkm2zdTbr972V3SQrmt2PTBgqwSmYxXqRyOJDhEqH8uu1zlQPPcbujEdZs'

export function convertToken(provider, response) {
    console.log(response)
    return {
        type: LOGIN,
        payload: {
            request: {
                url: `/auth/convert-token/`,
                method: 'POST',
                data: {
                    grant_type: 'convert_token',
                    client_id: INTERNAL_CLIENT_ID,
                    client_secret: INTERNAL_CLIENT_SECRET,
                    backend: provider,
                    token: response.token
                }
            }
        }
    }
}

export function loginUser(username, password) {
    return {
        type: LOGIN,
        payload: {
            request:{
                url: `/auth/token/`,
                method: 'POST',
                data: {
                    username,
                    password,
                    client_id: INTERNAL_CLIENT_ID,
                    client_secret: INTERNAL_CLIENT_SECRET,
                    grant_type: 'password'
                }
            }
        }
    }
}

export function registerUser(email, password) {
    return {
        type: REGISTER_USER,
        payload: {
            request: {
                url: `/register/`,
                method: 'POST',
                data: {
                    username: email,
                    email: email,
                    password: password
                }
            }
        }
    }
}