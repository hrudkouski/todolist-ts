import {todoListApi, TodoListType} from "../../api/todoList-api";
import {Dispatch} from "redux";

// Actions
export const SET_TODOLISTS = 'todolist-ts/todolists-reducer/SET_TODOLISTS';
export const ADD_TODOLIST = 'todolist-ts/todolists-reducer/ADD_TODOLIST';
export const REMOVE_TODOLIST = 'todolist-ts/todolists-reducer/REMOVE_TODOLIST';
const CHANGE_TODOLIST_TITLE = 'todolist-ts/todolists-reducer/CHANGE_TODOLIST_TITLE';
const CHANGE_TODOLIST_FILTER = 'todolist-ts/todolists-reducer/CHANGE_TODOLIST_FILTER';

// Types
export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>
export type AddTodoListAT = ReturnType<typeof addTodolistAC>
export type RemoveTodoListAT = ReturnType<typeof removeTodolistAC>
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
}
export type ActionsType =
    | SetTodolistsAT
    | AddTodoListAT
    | RemoveTodoListAT
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>

// Initial State
const initialState: TodoListDomainType[] = [];

// Reducer
export const todoListsReducer = (state: TodoListDomainType[] = initialState, action: ActionsType): TodoListDomainType[] => {
    switch (action.type) {
        case SET_TODOLISTS: {
            return action.todolists.map(el => ({...el, filter: "all"}));
        }
        case ADD_TODOLIST:
            return [{...action.todolist, filter: 'all'}, ...state]
        case REMOVE_TODOLIST:
            return state.filter(el => el.id !== action.id)
        case CHANGE_TODOLIST_TITLE:
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl);
        case CHANGE_TODOLIST_FILTER:
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
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


// Thunk Creators
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch<ActionsType>) => {
        todoListApi.getToDoList()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todoListApi.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC(res.data.data.item))
                }
            })
    }
}

export const removeTodolistTC = (todoListID: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todoListApi.deleteTodolist(todoListID)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTodolistAC(todoListID))
                }
            })
    }
}

export const changeTodoListTitleTC = (newTitle: string, todoListID: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todoListApi.updateTodolistTitle(newTitle, todoListID)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTodoListTitleAC(todoListID, newTitle))
                }
            })
    }
}
