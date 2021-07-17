import {authAPI, LoginParamsType} from "../../api/todoList-api";
import {AppThunkType} from "../../app/store";
import {setAppStatus} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

// Actions
const SET_IS_LOGGED_IN = 'todolist-ts/login-reducer/SET_IS_LOGGED_IN';

// Types
type InitialStateType = typeof initialState
export type LoginActionsType = ReturnType<typeof setIsLoggedInAC>

//Initial State
const initialState = {
    isLoggedIn: false
}

// Reducer
export const loginReducer = (state = initialState, action: LoginActionsType): InitialStateType => {
    switch (action.type) {
        case SET_IS_LOGGED_IN:
            return {
                ...state,
                isLoggedIn: action.value
            }
        default:
            return state;
    }
}

// Action Creators
export const setIsLoggedInAC = (value: boolean) => ({type: SET_IS_LOGGED_IN, value} as const)

// Thunk Creators
export const logIn = (values: LoginParamsType): AppThunkType => {
    return (dispatch) => {
        dispatch(setAppStatus('loading'))
        authAPI.logIn(values)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(true))
                    dispatch(setAppStatus('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const logOut = (): AppThunkType => {
    return (dispatch) => {
        dispatch(setAppStatus('loading'))
        authAPI.logOut()
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(false))
                    dispatch(setAppStatus('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
