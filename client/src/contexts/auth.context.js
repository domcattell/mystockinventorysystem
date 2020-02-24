import React, { createContext, useReducer, useEffect } from 'react';
import { CHECK_AUTH_ERROR, CLEAR_MESSAGES, USER_LOADED, USER_LOADING, AUTH_ERROR, CHECK_USERNAME, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS } from '../actions/types'
import authReducer from '../reducers/authReducer'
import axios from 'axios';
import authToken from '../helpers/authToken'

export const AuthContext = createContext()

export const AuthProvider = (props) => {

    const initialState = {
        authLoading: true,
        msg: "",
        token: localStorage.getItem('token'),
        currentUser: null,
        error: false
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    const userLoading = () => {
        dispatch({
            type: USER_LOADING
        })
    }

    const checkAuth = async () => {
        if(localStorage.token) {
            authToken(localStorage.token)
        }
    
        try {
            const res = await axios.get('/api/auth')
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
            console.log("SSSUCCESSS")
        } catch (err) {
            dispatch({
                type: CHECK_AUTH_ERROR,
                payload: err.response.data
            })
            console.log("ERRRORORED")
        }
    }

    const loginUser = async (user) => {
        const config = {
            header: {
                'Content-Type:': 'application/json'
            }
        }
        try {
            const res = await axios.post("/api/login", user, config)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            checkAuth();
        } catch (err) {
            dispatch({
                type: AUTH_ERROR,
                payload: err.response.data
            })
        }
    }

    const registerUser = async (newUser) => {
        try {
            const res = await axios.post("/api/register", newUser)
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data
            })
        } 
    }

    const checkUsername = async (user) => {
        try {
            const res = await axios.post("/api/register/validation", user)
            dispatch({ 
                type: CHECK_USERNAME, 
                payload: res.data
            })
        } catch(err) { 
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data
            })
        }
    }

    const logoutUser = () => dispatch({type: LOGOUT_SUCCESS})

    const clearMessages = () => dispatch({type: CLEAR_MESSAGES})

    return (
        <AuthContext.Provider value={{
                clearMessages, 
                registerUser, 
                userLoading, 
                logoutUser, 
                checkAuth, 
                checkUsername, 
                loginUser, 
                token: state.token, 
                error: state.error,  
                currentUser: state.currentUser, 
                msg: state.msg, 
                authLoading: state.authLoading}}>
            {props.children}
        </AuthContext.Provider>
    )
}
