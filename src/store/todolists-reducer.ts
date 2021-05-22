// import {FilterValuesType, TodoListType} from "../App";
// import {v1} from "uuid";
//
// export type DeleteTodoListType = {
//     type: 'DELETE-TODOLIST'
//     todoListID: string
// }
//
// export type AddTodoListType = {
//     type: 'ADD-TODOLIST'
//     title: string
// }
//
// export type ChangeTodoListTitleType = {
//     type: 'CHANGE-TODOLIST-TITLE'
//     newTitle: string
//     todoListID: string
// }
//
// export type ChangeFilterType = {
//     type: 'CHANGE-FILTER'
//     todoListID: string
//     value: FilterValuesType
// }
//
// export type ActionType = DeleteTodoListType | AddTodoListType | ChangeTodoListTitleType | ChangeFilterType
//
// export const todoListsReducer =
//     (todoLists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
//         switch (action.type) {
//             case 'DELETE-TODOLIST':
//                 return todoLists.filter(el => el.id !== action.todoListID)
//             case 'ADD-TODOLIST':
//                 const newTodoListID = v1();
//                 const newTodoList: TodoListType = {
//                     id: newTodoListID,
//                     title: action.title,
//                     filter: 'all',
//                 }
//                 return [...todoLists, newTodoList]
//             case "CHANGE-TODOLIST-TITLE":
//                 return todoLists.map(tl => tl.id === action.todoListID
//                     ? {...tl, title: action.newTitle}
//                     : tl)
//             case "CHANGE-FILTER":
//                 return todoLists.map(tl => tl.id === action.todoListID
//                     ? {...tl, filter: action.value}
//                     : tl)
//             default:
//                 return todoLists;
//         }
//     }
//
// export const DeleteTodoListAC = (todoListID: string): DeleteTodoListType => {
//     return {type: "DELETE-TODOLIST", todoListID: todoListID}
// }
//
// export const AddTodoListAC = (title: string): AddTodoListType => {
//     return {type: 'ADD-TODOLIST', title: title}
// }
//
// export const ChangeTodoListTitleAC = (todoListID: string, newTitle: string
// ): ChangeTodoListTitleType => {
//     return {type: 'CHANGE-TODOLIST-TITLE', todoListID: todoListID, newTitle: newTitle}
// }
//
// export const ChangeFilterTypeAC = (todoListID: string, value: FilterValuesType
// ): ChangeFilterType => {
//     return {type: 'CHANGE-FILTER', todoListID: todoListID, value: value}
// }

import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
}
export type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export type ActionsType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT;

export const todoListsReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodoListID = v1();
            const newTodoList: TodoListType = {
                id: newTodoListID,
                title: action.title,
                filter: 'all',
            }
            return [...state, newTodoList]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id
                ? {...tl, title: action.title}
                : tl);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id
                ? {...tl, filter: action.filter}
                : tl)
        default:
            throw new Error('I don`t understand this action type')
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodoListAT => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (newTodolistTitle: string): AddTodoListAT => {
    return {type: 'ADD-TODOLIST', title: newTodolistTitle}
}
export const ChangeTodoListTitleAC = (todoListID: string, newTodoListTitle: string): ChangeTodoListTitleAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todoListID, title: newTodoListTitle}
}
export const ChangeTodoListFilterAC = (todoListID: string, newFilter: FilterValuesType): ChangeTodoListFilterAT => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todoListID, filter: newFilter}
}
