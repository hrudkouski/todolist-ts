import {authAPI} from "../api/todoList-api";
import {AppThunkType} from "./store";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";

// Actions
const SET_STATUS = 'todolist-ts/app-reducer/SET_STATUS';
const SET_ERROR = 'todolist-ts/app-reducer/SET_ERROR';
const SET_INITIALIZED = 'todolist-ts/app-reducer/SET_INITIALIZED';

// Types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type ErrorType = null | string;
export type SetAppErrorAT = ReturnType<typeof setAppError>;
export type SetAppStatusAT = ReturnType<typeof setAppStatus>;
export type SetInitializedStatusAT = ReturnType<typeof setInitializedStatus>;
export type AppActionsType = SetAppErrorAT | SetAppStatusAT | SetInitializedStatusAT;
export type InitialStateType = typeof initialState;

//Initial State
const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as ErrorType,
    isInitialized: false,
}

// Reducer
export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case SET_STATUS:
            return {...state, status: action.status}
        case SET_ERROR:
            return {...state, error: action.error}
        case SET_INITIALIZED:
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

// Action Creators
export const setAppError = (error: ErrorType) => ({type: SET_ERROR, error}) as const;
export const setAppStatus = (status: RequestStatusType) => ({type: SET_STATUS, status}) as const;
export const setInitializedStatus = (isInitialized: boolean) => ({type: SET_INITIALIZED, isInitialized}) as const;

// Thunk Creators
export const initializeAppTC = (): AppThunkType => {
    return (dispatch) => {
        dispatch(setAppStatus('loading'))
        authAPI.authMe()
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
            .finally(() => {
                dispatch(setInitializedStatus(true))
            })
    }
}
