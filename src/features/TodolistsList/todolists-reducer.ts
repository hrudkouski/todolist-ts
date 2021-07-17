import {todoListApi, TodoListType} from "../../api/todoList-api";
import {RequestStatusType, setAppStatus} from "../../app/app-reducer";
import {AppThunkType} from "../../app/store";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

// Actions
export const SET_TODOLISTS = 'todolist-ts/todolists-reducer/SET_TODOLISTS';
export const ADD_TODOLIST = 'todolist-ts/todolists-reducer/ADD_TODOLIST';
export const REMOVE_TODOLIST = 'todolist-ts/todolists-reducer/REMOVE_TODOLIST';
const CHANGE_TODOLIST_TITLE = 'todolist-ts/todolists-reducer/CHANGE_TODOLIST_TITLE';
const CHANGE_TODOLIST_FILTER = 'todolist-ts/todolists-reducer/CHANGE_TODOLIST_FILTER';
const CHANGE_TODOLIST_ENTITY_STATUS = 'todolist-ts/todolists-reducer/CHANGE_TODOLIST_ENTITY_STATUS';

// Types
export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>
export type AddTodoListAT = ReturnType<typeof addTodolistAC>
export type RemoveTodoListAT = ReturnType<typeof removeTodolistAC>
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
export type TodolistsActionsType =
    | SetTodolistsAT
    | AddTodoListAT
    | RemoveTodoListAT
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>

// Initial State
const initialState: TodoListDomainType[] = [];

// Reducer
export const todoListsReducer = (state: TodoListDomainType[] = initialState, action: TodolistsActionsType): TodoListDomainType[] => {
    switch (action.type) {
        case SET_TODOLISTS: {
            return action.todolists.map(el => ({...el, filter: "all", entityStatus: "idle"}));
        }
        case ADD_TODOLIST:
            return [{...action.todolist, filter: 'all', entityStatus: "idle"}, ...state]
        case REMOVE_TODOLIST:
            return state.filter(el => el.id !== action.id)
        case CHANGE_TODOLIST_TITLE:
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl);
        case CHANGE_TODOLIST_FILTER:
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case CHANGE_TODOLIST_ENTITY_STATUS:
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        default:
            return state;
    }
}

// Action Creators
export const setTodolistsAC = (todolists: TodoListType[],) => {
    return {type: SET_TODOLISTS, todolists} as const
}
export const addTodolistAC = (todolist: TodoListType) => {
    return {type: ADD_TODOLIST, todolist} as const
}
export const removeTodolistAC = (todolistId: string) => {
    return {type: REMOVE_TODOLIST, id: todolistId} as const
}
export const changeTodoListTitleAC = (todoListID: string, newTodoListTitle: string) => {
    return {type: CHANGE_TODOLIST_TITLE, id: todoListID, title: newTodoListTitle} as const
}
export const changeTodoListFilterAC = (todoListID: string, newFilter: FilterValuesType) => {
    return {type: CHANGE_TODOLIST_FILTER, id: todoListID, filter: newFilter} as const
}
export const changeTodolistEntityStatusAC = (todoListID: string, entityStatus: RequestStatusType) => {
    return {type: CHANGE_TODOLIST_ENTITY_STATUS, id: todoListID, entityStatus} as const
}

// Thunk Creators
export const fetchTodolistsTC = (): AppThunkType => {
    return (dispatch) => {
        dispatch(setAppStatus('loading'))
        todoListApi.getToDoList()
            .then((res) => {
                    dispatch(setTodolistsAC(res.data))
                    dispatch(setAppStatus('succeeded'))
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const addTodolistTC = (title: string): AppThunkType => {
    return (dispatch) => {
        dispatch(setAppStatus('loading'))
        todoListApi.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC(res.data.data.item))
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
export const removeTodolistTC = (todoListID: string): AppThunkType => {
    return (dispatch) => {
        dispatch(setAppStatus('loading'));
        dispatch(changeTodolistEntityStatusAC(todoListID, 'loading'))
        todoListApi.deleteTodolist(todoListID)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTodolistAC(todoListID))
                    dispatch(setAppStatus('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch);
                    dispatch(changeTodolistEntityStatusAC(todoListID, 'failed'))
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
                dispatch(changeTodolistEntityStatusAC(todoListID, 'failed'))
            })
    }
}
export const changeTodoListTitleTC = (newTitle: string, todoListID: string): AppThunkType => {
    return (dispatch) => {
        dispatch(setAppStatus('loading'));
        dispatch(changeTodolistEntityStatusAC(todoListID, 'loading'))
        todoListApi.updateTodolistTitle(newTitle, todoListID)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTodoListTitleAC(todoListID, newTitle))
                    dispatch(setAppStatus('succeeded'));
                    dispatch(changeTodolistEntityStatusAC(todoListID, 'succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch);
                    dispatch(changeTodolistEntityStatusAC(todoListID, 'failed'))
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
                dispatch(changeTodolistEntityStatusAC(todoListID, 'failed'))
            })
    }
}
