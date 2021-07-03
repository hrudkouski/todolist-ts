import {tasksReducer} from './tasks-reducer';
import {todoListsReducer} from './todolists-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleWare from "redux-thunk";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare));

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
