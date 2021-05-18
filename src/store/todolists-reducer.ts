import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type DeleteTodoListType = {
    type: 'DELETE-TODOLIST'
    todoListID: string
}

export type AddTodoListType = {
    type: 'ADD-TODOLIST'
    title: string
}

export type ChangeTodoListTitleType = {
    type: 'CHANGE-TODOLIST-TITLE'
    newTitle: string
    todoListID: string
}

export type ChangeFilterType = {
    type: 'CHANGE-FILTER'
    todoListID: string
    value: FilterValuesType
}

export type ActionType = DeleteTodoListType | AddTodoListType | ChangeTodoListTitleType | ChangeFilterType

export const todoListsReducer =
    (todoLists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
        switch (action.type) {
            case 'DELETE-TODOLIST':
                return todoLists.filter(el => el.id !== action.todoListID)
            case 'ADD-TODOLIST':
                const newTodoListID = v1();
                const newTodoList: TodoListType = {
                    id: newTodoListID,
                    title: action.title,
                    filter: 'all',
                }
                return [...todoLists, newTodoList]
            case "CHANGE-TODOLIST-TITLE":
                return todoLists.map(tl => tl.id === action.todoListID
                    ? {...tl, title: action.newTitle}
                    : tl)
            case "CHANGE-FILTER":
                return todoLists.map(tl => tl.id === action.todoListID
                    ? {...tl, filter: action.value}
                    : tl)
            default:
                return todoLists;
        }
    }

export const DeleteTodoListAC = (todoListID: string): DeleteTodoListType => {
    return {type: "DELETE-TODOLIST", todoListID: todoListID}
}

export const AddTodoListAC = (title: string): AddTodoListType => {
    return {type: 'ADD-TODOLIST', title: title}
}

export const ChangeTodoListTitleAC = (todoListID: string, newTitle: string
): ChangeTodoListTitleType => {
    return {type: 'CHANGE-TODOLIST-TITLE', todoListID: todoListID, newTitle: newTitle}
}

export const ChangeFilterTypeAC = (todoListID: string, value: FilterValuesType
): ChangeFilterType => {
    return {type: 'CHANGE-FILTER', todoListID: todoListID, value: value}
}