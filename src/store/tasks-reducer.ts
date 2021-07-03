import {TaskStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {ADD_TODOLIST, AddTodoListAT, REMOVE_TODOLIST, RemoveTodoListAT} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TasksType} from "../api/todoList-api";

// Actions
const ADD_TASK = 'todolist-ts/tasks-reducer/ADD_TASK';
const REMOVE_TASK = 'todolist-ts/tasks-reducer/REMOVE_TASK';
const CHANGE_TASK_STATUS = 'todolist-ts/tasks-reducer/CHANGE_TASK_STATUS';
const CHANGE_TITLE_STATUS = 'todolist-ts/tasks-reducer/CHANGE_TITLE_STATUS';

// Types
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type RemoveTaskAT = ReturnType<typeof removeTasksAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type ChangeTitleStatusAT = ReturnType<typeof changeTitleStatusAC>
export type ActionsType = AddTaskAT
    | RemoveTaskAT
    | ChangeTaskStatusAT
    | ChangeTitleStatusAT
    | AddTodoListAT
    | RemoveTodoListAT;

//Initial State

// const todoListID_1 = v1();
// const todoListID_2 = v1();

const initialState: TaskStateType = {
    // [todoListID_1]: [
    //     {
    //         id: v1(), title: 'React', status: TaskStatuses.InProgress,
    //         description: '', priority: TaskPriorities.Low, startDate: '',
    //         deadline: '', todoListId: todoListID_1, order: 0, addedDate: '',
    //     },
    //     {
    //         id: v1(), title: 'JS', status: TaskStatuses.Completed,
    //         description: '', priority: TaskPriorities.Low, startDate: '',
    //         deadline: '', todoListId: todoListID_1, order: 0, addedDate: '',
    //     },
    // ],
    // [todoListID_2]: [
    //     {
    //         id: v1(), title: 'Salt', status: TaskStatuses.InProgress,
    //         description: '', priority: TaskPriorities.Low, startDate: '',
    //         deadline: '', todoListId: todoListID_2, order: 0, addedDate: '',
    //     },
    //     {
    //         id: v1(), title: 'Milk', status: TaskStatuses.InProgress,
    //         description: '', priority: TaskPriorities.Low, startDate: '',
    //         deadline: '', todoListId: todoListID_2, order: 0, addedDate: '',
    //     },
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
                status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: action.todoListID,
                order: 0,
                addedDate: '',
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
                        ? {...t, status: action.status}
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
export const addTaskAC = (title: string, todoListID: string) => {
    return {type: ADD_TASK, title, todoListID,} as const
}
export const removeTasksAC = (taskID: string, todoListID: string) => {
    return {type: REMOVE_TASK, taskID: taskID, todoListID: todoListID,} as const
}
export const changeTaskStatusAC = (taskId: string,
                                   status: TaskStatuses,
                                   todoListID: string) => {
    return {type: CHANGE_TASK_STATUS, taskId, status, todoListID,} as const
}
export const changeTitleStatusAC = (taskId: string, newTitle: string, todoListID: string) => {
    return {type: CHANGE_TITLE_STATUS, taskId, newTitle, todoListID,} as const
}
