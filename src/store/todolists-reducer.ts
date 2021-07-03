import {v1} from "uuid";
import {todoListApi, TodoListType} from "../api/todoList-api";
import {Dispatch} from "redux";

// Actions
export const REMOVE_TODOLIST = 'todolist-ts/todolists-reducer/REMOVE_TODOLIST';
export const ADD_TODOLIST = 'todolist-ts/todolists-reducer/ADD_TODOLIST';
const CHANGE_TODOLIST_TITLE = 'todolist-ts/todolists-reducer/CHANGE_TODOLIST_TITLE';
const CHANGE_TODOLIST_FILTER = 'todolist-ts/todolists-reducer/CHANGE_TODOLIST_FILTER';
export const SET_TODOLISTS = 'todolist-ts/todolists-reducer/SET_TODOLISTS';


// Types
export type RemoveTodoListAT = ReturnType<typeof removeTodolistAC>
export type AddTodoListAT = ReturnType<typeof addTodolistAC>
export type ChangeTodoListTitleAT = ReturnType<typeof changeTodoListTitleAC>
export type ChangeTodoListFilterAT = ReturnType<typeof changeTodoListFilterAC>
export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
}
export type ActionsType = RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListTitleAT
    | ChangeTodoListFilterAT
    | SetTodolistsAT;

const initialState: TodoListDomainType[] = [
    // {
    //     id: todoListID_1, title: 'What to learn', filter: 'all', addedDate: '',
    //     order: 0
    // },
    // {
    //     id: todoListID_2, title: 'What to bye', filter: 'all', addedDate: '',
    //     order: 0
    // },
]

// Reducer
export const todoListsReducer = (state: TodoListDomainType[] = initialState, action: ActionsType): TodoListDomainType[] => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return state.filter(el => el.id !== action.id)
        case ADD_TODOLIST:
            const newTodoList: TodoListDomainType = {
                id: action.todoListID,
                title: action.title,
                addedDate: '',
                filter: 'all',
                order: 0,
            }
            return [...state, newTodoList]
        case CHANGE_TODOLIST_TITLE:
            return state.map(tl => tl.id === action.id
                ? {...tl, title: action.title}
                : tl);
        case CHANGE_TODOLIST_FILTER:
            return state.map(tl => tl.id === action.id
                ? {...tl, filter: action.filter}
                : tl)
        case SET_TODOLISTS: {
            return action.todolists.map(el => ({
                ...el,
                filter: "all"
            }));
        }
        default:
            return state;
    }
}

// Action Creators
export const removeTodolistAC = (todolistId: string) => {
    return {type: REMOVE_TODOLIST, id: todolistId} as const
}
export const addTodolistAC = (newTodolistTitle: string) => {
    return {type: ADD_TODOLIST, title: newTodolistTitle, todoListID: v1()} as const
}
export const changeTodoListTitleAC = (todoListID: string, newTodoListTitle: string) => {
    return {type: CHANGE_TODOLIST_TITLE, id: todoListID, title: newTodoListTitle} as const
}
export const changeTodoListFilterAC = (todoListID: string, newFilter: FilterValuesType) => {
    return {type: CHANGE_TODOLIST_FILTER, id: todoListID, filter: newFilter} as const
}
export const setTodolistsAC = (todolists: TodoListType[],) => {
    return {type: SET_TODOLISTS, todolists} as const
}

// Thunk
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todoListApi.getToDoList()
            .then((res) => {
                const action = res.data;
                dispatch(setTodolistsAC(action))
            })
    }
}
