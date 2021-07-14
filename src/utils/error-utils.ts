import {Dispatch} from 'redux';
import {CommonResponseType} from "../api/todoList-api";
import {setAppError, SetAppErrorAT, setAppStatus, SetAppStatusAT} from "../app/app-reducer";

// generic function
export const handleServerAppError = <T>(data: CommonResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppError(data.messages[0]))
    } else {
        dispatch(setAppError('Some error occurred'))
    }
    dispatch(setAppStatus('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppError(error.message))
    dispatch(setAppStatus('failed'))
}

type ErrorUtilsDispatchType = Dispatch<SetAppErrorAT | SetAppStatusAT>
