import {AppRootStateType} from "../app/store";
import {Provider} from "react-redux";
import React from "react";
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
import {tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {todoListsReducer} from "../features/TodolistsList/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todoList-api";
import thunkMiddleWare from "redux-thunk";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

const initialGlobalState = {
    todoLists: [
        {
            id: 'todoListID_1',
            title: 'What to learn',
            filter: 'all',
            addedDate: '',
            order: 0,
        },
        {
            id: 'todoListID_2',
            title: 'What to bye',
            filter: 'all',
            addedDate: '',
            order: 0,
        },
    ] ,
    tasks: {
        ['todoListID_1']: [
            {
                id: v1(), title: 'React', status: TaskStatuses.InProgress,
                description: '', priority: TaskPriorities.Low, startDate: '',
                deadline: '', todoListId: 'todoListID_1', order: 0, addedDate: '',
            },
            {
                id: v1(), title: 'JS', status: TaskStatuses.Completed,
                description: '', priority: TaskPriorities.Low, startDate: '',
                deadline: '', todoListId: 'todoListID_1', order: 0, addedDate: '',
            },
        ],
        ['todoListID_2']: [
            {
                id: v1(), title: 'Salt', status: TaskStatuses.InProgress,
                description: '', priority: TaskPriorities.Low, startDate: '',
                deadline: '', todoListId: 'todoListID_2', order: 0, addedDate: '',
            },
            {
                id: v1(), title: 'Milk', status: TaskStatuses.InProgress,
                description: '', priority: TaskPriorities.Low, startDate: '',
                deadline: '', todoListId: 'todoListID_2', order: 0, addedDate: '',
            },
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType, applyMiddleware(thunkMiddleWare));

export const ReduxStoreProviderDecorator = (storeFn: () => React.ReactNode) => <Provider store={storyBookStore}>
    {storeFn()}
</Provider>