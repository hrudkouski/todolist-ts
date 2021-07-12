export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type ErrorType = null | string;
export type SetErrorAT = ReturnType<typeof setAppError>;
export type SetStatusAT = ReturnType<typeof setAppStatus>;
export type AppActionsType = SetErrorAT | SetStatusAT;
export type InitialStateType = typeof initialState;

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as ErrorType,
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppError = (error: ErrorType) => ({type: 'APP/SET-ERROR', error}) as const;
export const setAppStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status}) as const;
