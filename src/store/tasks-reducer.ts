import {TaskStateType, TasksType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";

const REMOVE_TASK = 'REMOVE_TASK';
const ADD_TASK = 'ADD_TASK';
const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS';
const CHANGE_TITLE_STATUS = 'CHANGE_TITLE_STATUS';
const ADD_TODOLIST = 'ADD_TODOLIST';
const REMOVE_TODOLIST = 'REMOVE_TODOLIST';

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

const initialState: TaskStateType = {
    // [todoListID_1]: [
    //     {id: v1(), title: 'React', isDone: false},
    //     {id: v1(), title: 'JS', isDone: false},
    //     {id: v1(), title: 'HTML', isDone: false},
    //     {id: v1(), title: 'CSS', isDone: false},
    // ],
    // [todoListID_2]: [
    //     {id: v1(), title: 'Milk', isDone: false},
    //     {id: v1(), title: 'Salt', isDone: false},
    //     {id: v1(), title: 'Bread', isDone: false},
    //     {id: v1(), title: 'Butter', isDone: false},
    // ]
};

export const tasksReducer = (state = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case REMOVE_TASK:
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].filter((el) => el.id !== action.taskID),
            };
        case ADD_TASK:
            const newTask: TasksType = {
                id: v1(),
                title: action.title,
                isDone: false,
            }
            return {
                ...state,
                [action.todoListID]: [newTask, ...state[action.todoListID]],
            }
        case CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(t =>
                    t.id === action.taskId
                        ? {...t, isDone: action.newIsDoneValue}
                        : t),
            }
        case CHANGE_TITLE_STATUS:
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(t =>
                    t.id === action.taskId
                        ? {...t, title: action.newTitle}
                        : t),
            };
        case ADD_TODOLIST:
            return {
                ...state,
                [action.todoListID]: [],
            }
        case REMOVE_TODOLIST:
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        default:
            // throw new Error('I don`t understand this action type')
            return state;
    }
}

export const addTaskAC = (title: string, todoListID: string): AddTaskAT => {
    return {type: 'ADD_TASK', title, todoListID,}
}
export const removeTasksAC = (taskID: string, todoListID: string): RemoveTaskAT => {
    return {type: 'REMOVE_TASK', taskID: taskID, todoListID: todoListID,}
}
export const changeTaskStatusAC = (taskId: string,
                                   newIsDoneValue: boolean,
                                   todoListID: string): ChangeTaskStatusAT => {
    return {type: 'CHANGE_TASK_STATUS', taskId, newIsDoneValue, todoListID,}
}
export const changeTitleStatusAC = (taskId: string, newTitle: string, todoListID: string): ChangeTitleStatusAT => {
    return {type: 'CHANGE_TITLE_STATUS', taskId, newTitle, todoListID,}
}
