import {
    SetTodolistsAT, AddTodoListAT, RemoveTodoListAT,
    SET_TODOLISTS, ADD_TODOLIST, REMOVE_TODOLIST,
} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TasksType, todoListApi, UpdateTaskModelType} from "../../api/todoList-api";
import {AppRootStateType, AppThunkType} from "../../app/store";
import {setAppError, setAppStatus} from "../../app/app-reducer";

// Actions
const SET_TASKS = 'todolist-ts/tasks-reducer/SET_TASKS';
const ADD_TASK = 'todolist-ts/tasks-reducer/ADD_TASK';
const REMOVE_TASK = 'todolist-ts/tasks-reducer/REMOVE_TASK';
const UPDATE_TASK = 'todolist-ts/tasks-reducer/UPDATE_TASK';

// Types
export type UpdateDomainTaskModelType = {
    description?: string | null
    title?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string | null
    deadline?: string | null
}
export type TaskStateType = {
    [key: string]: Array<TasksType>
}
export type TasksActionsType =
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTasksAC>
    | ReturnType<typeof updateTaskAC>
    | SetTodolistsAT
    | AddTodoListAT
    | RemoveTodoListAT;

//Initial State
const initialState: TaskStateType = {};

// Reducer
export const tasksReducer = (state = initialState, action: TasksActionsType): TaskStateType => {
    switch (action.type) {
        case SET_TASKS:
            return {...state, [action.todoListID]: action.tasks}
        case ADD_TASK:
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]],
            }
        case REMOVE_TASK:
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].filter((el) => el.id !== action.taskID)
            };
        case UPDATE_TASK:
            return {
                ...state,
                [action.todoListID]: state[action.todoListID]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case SET_TODOLISTS: {
            const copyState = {...state}
            action.todolists.forEach(el => {
                copyState[el.id] = [];
            })
            return copyState
        }
        case ADD_TODOLIST:
            return {...state, [action.todolist.id]: []}
        case REMOVE_TODOLIST:
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        default:
            return state;
    }
}

// Action Creators
export const setTasksAC = (tasks: TasksType[], todoListID: string) => {
    return {type: SET_TASKS, tasks, todoListID,} as const
}
export const addTaskAC = (task: TasksType) => {
    return {type: ADD_TASK, task,} as const
}
export const removeTasksAC = (taskID: string, todoListID: string) => {
    return {type: REMOVE_TASK, taskID: taskID, todoListID: todoListID,} as const
}
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todoListID: string) => {
    return {type: UPDATE_TASK, taskId, model, todoListID,} as const
}

// Thunk Creators
export const fetchTasksTC = (todoListID: string): AppThunkType => {
    return (dispatch) => {
        dispatch(setAppStatus('loading'))
        todoListApi.getTasksForTodolist(todoListID)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, todoListID))
                dispatch(setAppStatus('succeeded'))
            })
    }
}
export const addTaskTC = (title: string, todoListID: string): AppThunkType => {
    return (dispatch) => {
        dispatch(setAppStatus('loading'))
        todoListApi.createTaskForTodolist(title, todoListID)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC(res.data.data.item))
                    dispatch(setAppStatus('succeeded'))
                } else {
                    if (res.data.messages.length) {
                        dispatch(setAppError(res.data.messages[0]))
                    } else {
                        dispatch(setAppError('Some error occurred'))
                    }
                    dispatch(setAppStatus('failed'))
                }
            })
    }
}
export const removeTaskTC = (taskID: string, todoListID: string): AppThunkType => {
    return (dispatch) => {
        dispatch(setAppStatus('loading'))
        todoListApi.deleteTaskFromTodolist(taskID, todoListID)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTasksAC(taskID, todoListID))
                    dispatch(setAppStatus('succeeded'))
                }
            })
    }
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todoListID: string): AppThunkType => {
    return (dispatch, getState: () => AppRootStateType) => {
        const allTasksFromState = getState().tasks;
        const task = allTasksFromState[todoListID].find(el => el.id === taskId);

        if (task) {
            const apiModel: UpdateTaskModelType = {
                description: task.description,
                title: task.title,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                ...domainModel
            };
            dispatch(setAppStatus('loading'))
            todoListApi.updateTaskForTodolist(todoListID, taskId, apiModel)
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(updateTaskAC(taskId, domainModel, todoListID))
                        dispatch(setAppStatus('succeeded'))
                    }
                })
        }
    }
}
