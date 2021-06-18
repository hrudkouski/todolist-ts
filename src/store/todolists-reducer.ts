import {FilterValuesType, TodoListType} from "../AppWithRedux";
import {v1} from "uuid";

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
export type ActionsType = RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListTitleAT
    | ChangeTodoListFilterAT;

//Initial State
// export const todoListID_1 = v1();
// export const todoListID_2 = v1();
const initialState: Array<TodoListType> = [
    // {id: todoListID_1, title: 'What to learn', filter: 'all'},
    // {id: todoListID_2, title: 'What to bye', filter: 'all'},
]

// Reducer
export const todoListsReducer = (state = initialState, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return state.filter(el => el.id !== action.id)
        case ADD_TODOLIST:
            const newTodoListID = action.todoListID;
            const newTodoList: TodoListType = {
                id: newTodoListID,
                title: action.title,
                filter: 'all',
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
