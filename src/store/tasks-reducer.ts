import {TaskStateType, TasksType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";

export type AddTaskAT = {
    type: 'ADD_TASK'
    title: string
    todoListID: string
}
export type RemoveTaskAT = {
    type: 'REMOVE_TASK'
    taskID: string
    todoListID: string
}
export type ChangeTaskStatusAT = {
    type: 'CHANGE_TASK_STATUS'
    taskId: string
    newIsDoneValue: boolean
    todoListID: string
}
export type ChangeTitleStatusAT = {
    type: 'CHANGE_TITLE_STATUS'
    taskId: string
    newTitle: string
    todoListID: string
}

export type ActionsType = AddTaskAT
    | RemoveTodoListAT
    | RemoveTaskAT
    | ChangeTaskStatusAT
    | ChangeTitleStatusAT
    | AddTodoListAT;

export const tasksReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            // const todoListsTasks = state[action.todoListID]
            // state[action.todoListID] = todoListsTasks.filter((task) => task.id !== action.taskID);
            // return {...state};
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].filter((el) => el.id !== action.taskID)
            };
        case 'ADD_TASK':
            const newTask: TasksType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {
                ...state,
                [action.todoListID]: [newTask, ...state[action.todoListID]]
            }
        case 'CHANGE_TASK_STATUS':
            state[action.todoListID] = state[action.todoListID].map(t =>
                t.id === action.taskId
                    ? {...t, isDone: action.newIsDoneValue}
                    : t)
            return {...state};
        case "CHANGE_TITLE_STATUS":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(t =>
                    t.id === action.taskId
                        ? {...t, title: action.newTitle}
                        : t)
            };
        case 'ADD_TODOLIST':
            return {
                ...state,
                [action.todoListID]: []
            }
        case 'REMOVE_TODOLIST':
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        default:
            throw new Error('I don`t understand this action type')
    }
}

export const addTaskAC = (title: string, todoListID: string): AddTaskAT => {
    return {type: 'ADD_TASK', title, todoListID}
}
export const removeTasksAC = (taskID: string, todoListID: string): RemoveTaskAT => {
    return {type: 'REMOVE_TASK', taskID: taskID, todoListID: todoListID}
}
export const changeTaskStatusAC = (taskId: string,
                                   newIsDoneValue: boolean,
                                   todoListID: string): ChangeTaskStatusAT => {
    return {type: 'CHANGE_TASK_STATUS', taskId, newIsDoneValue, todoListID}
}
export const changeTitleStatusAC = (taskId: string, newTitle: string, todoListID: string): ChangeTitleStatusAT => {
    return {type: 'CHANGE_TITLE_STATUS', taskId, newTitle, todoListID}
}
