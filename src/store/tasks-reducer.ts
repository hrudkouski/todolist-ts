import {TaskStateType, TasksType} from "../AppWithRedux";
import {v1} from "uuid";
import {ADD_TODOLIST, AddTodoListAT, REMOVE_TODOLIST, RemoveTodoListAT} from "./todolists-reducer";

// Actions
const ADD_TASK = 'todolist-ts/tasks-reducer/ADD_TASK';
const REMOVE_TASK = 'todolist-ts/tasks-reducer/REMOVE_TASK';
const CHANGE_TASK_STATUS = 'todolist-ts/tasks-reducer/CHANGE_TASK_STATUS';
const CHANGE_TITLE_STATUS = 'todolist-ts/tasks-reducer/CHANGE_TITLE_STATUS';

// Types
export type AddTaskAT = {
    type: typeof ADD_TASK
    title: string
    todoListID: string
}
export type RemoveTaskAT = {
    type: 'todolist-ts/tasks-reducer/REMOVE_TASK'
    taskID: string
    todoListID: string
}
export type ChangeTaskStatusAT = {
    type: typeof CHANGE_TASK_STATUS
    taskId: string
    newIsDoneValue: boolean
    todoListID: string
}
export type ChangeTitleStatusAT = {
    type: typeof CHANGE_TITLE_STATUS
    taskId: string
    newTitle: string
    todoListID: string
}
export type ActionsType = AddTaskAT
    | RemoveTaskAT
    | ChangeTaskStatusAT
    | ChangeTitleStatusAT
    | AddTodoListAT
    | RemoveTodoListAT;

//Initial State
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

// Reducer
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
            return state;
    }
}

// Action Creators
export const addTaskAC = (title: string, todoListID: string): AddTaskAT => {
    return {type: ADD_TASK, title, todoListID,}
}
export const removeTasksAC = (taskID: string, todoListID: string): RemoveTaskAT => {
    return {type: REMOVE_TASK, taskID: taskID, todoListID: todoListID,} as const
}
export const changeTaskStatusAC = (taskId: string,
                                   newIsDoneValue: boolean,
                                   todoListID: string): ChangeTaskStatusAT => {
    return {type: CHANGE_TASK_STATUS, taskId, newIsDoneValue, todoListID,}
}
export const changeTitleStatusAC = (taskId: string, newTitle: string, todoListID: string): ChangeTitleStatusAT => {
    return {type: CHANGE_TITLE_STATUS, taskId, newTitle, todoListID,}
}
