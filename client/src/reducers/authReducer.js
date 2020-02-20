import { CLEAR_MESSAGES, USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, CHECK_USERNAME } from '../actions/types'

const reducer = (state, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                fetchingUser: false,
                currentUser: action.payload.currentUser,
                successMsg: action.payload,
            }
            
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                fetchingUser: false,
                currentUser: action.payload.currentUser,
            }

        case USER_LOADING: {
            return {
                isAuthenticated: false,
                fetchingUser: true,
            }
        }

        case CHECK_USERNAME: {
            return {
                successMsg: action.payload
            }
        }

        case REGISTER_FAIL:
        case AUTH_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                fetchingUser: false,
                errorMsg: action.payload
            }
        
        case CLEAR_MESSAGES:
            return {
                ...state,
                successMsg: null,
                errorMsg: null
            }
            
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            return {
                ...state,
                isAuthenticated: false,
                fetchingUser: false,
                currentUser: null,
                token: null,
            }
    }
}

export default reducer