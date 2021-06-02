import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

const REMOVE_TODOLIST = 'REMOVE_TODOLIST';
const ADD_TODOLIST = 'ADD_TODOLIST';
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE';
const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER';

export type RemoveTodoListAT = {
    type: 'REMOVE_TODOLIST'
    id: string
}
export type AddTodoListAT = {
    type: 'ADD_TODOLIST'
    title: string
    todoListID: string
}
export type ChangeTodoListTitleAT = {
    type: 'CHANGE_TODOLIST_TITLE'
    id: string
    title: string
}
export type ChangeTodoListFilterAT = {
    type: 'CHANGE_TODOLIST_FILTER'
    id: string
    filter: FilterValuesType
}

export type ActionsType = RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListTitleAT
    | ChangeTodoListFilterAT;

export const todoListID_1 = v1();
export const todoListID_2 = v1();

const initialState: Array<TodoListType> = [
    {id: todoListID_1, title: 'What to learn', filter: 'all'},
    {id: todoListID_2, title: 'What to bye', filter: 'all'},
]

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
            // throw new Error('I don`t understand this action type')
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodoListAT => {
    return {type: 'REMOVE_TODOLIST', id: todolistId}
}
export const addTodolistAC = (newTodolistTitle: string): AddTodoListAT => {
    return {type: 'ADD_TODOLIST', title: newTodolistTitle, todoListID: v1()}
}
export const changeTodoListTitleAC = (todoListID: string, newTodoListTitle: string): ChangeTodoListTitleAT => {
    return {type: 'CHANGE_TODOLIST_TITLE', id: todoListID, title: newTodoListTitle}
}
export const changeTodoListFilterAC = (todoListID: string, newFilter: FilterValuesType): ChangeTodoListFilterAT => {
    return {type: 'CHANGE_TODOLIST_FILTER', id: todoListID, filter: newFilter}
}
