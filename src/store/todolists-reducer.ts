import {v1} from "uuid";
import {TodoListType} from "../api/todoList-api";

// Actions
export const REMOVE_TODOLIST = 'todolist-ts/todolists-reducer/REMOVE_TODOLIST';
export const ADD_TODOLIST = 'todolist-ts/todolists-reducer/ADD_TODOLIST';
const CHANGE_TODOLIST_TITLE = 'todolist-ts/todolists-reducer/CHANGE_TODOLIST_TITLE';
const CHANGE_TODOLIST_FILTER = 'todolist-ts/todolists-reducer/CHANGE_TODOLIST_FILTER';

// Types
export type RemoveTodoListAT = {
    type: typeof REMOVE_TODOLIST
    id: string
}
export type AddTodoListAT = {
    type: typeof ADD_TODOLIST
    title: string
    todoListID: string
}
export type ChangeTodoListTitleAT = {
    type: typeof CHANGE_TODOLIST_TITLE
    id: string
    title: string
}
export type ChangeTodoListFilterAT = {
    type: typeof CHANGE_TODOLIST_FILTER
    id: string
    filter: FilterValuesType
}
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
}
export type ActionsType = RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListTitleAT
    | ChangeTodoListFilterAT;

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
        default:
            return state;
    }
}

// Action Creators
export const removeTodolistAC = (todolistId: string): RemoveTodoListAT => {
    return {type: REMOVE_TODOLIST, id: todolistId}
}
export const addTodolistAC = (newTodolistTitle: string): AddTodoListAT => {
    return {type: ADD_TODOLIST, title: newTodolistTitle, todoListID: v1()}
}
export const changeTodoListTitleAC = (todoListID: string, newTodoListTitle: string): ChangeTodoListTitleAT => {
    return {type: CHANGE_TODOLIST_TITLE, id: todoListID, title: newTodoListTitle}
}
export const changeTodoListFilterAC = (todoListID: string, newFilter: FilterValuesType): ChangeTodoListFilterAT => {
    return {type: CHANGE_TODOLIST_FILTER, id: todoListID, filter: newFilter}
}
