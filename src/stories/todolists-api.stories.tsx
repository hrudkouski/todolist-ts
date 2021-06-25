import React, {useEffect, useState} from 'react'
import {todoListApi} from "../api/todoList-api";

export default {
    title: 'TodoLists API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListApi.getToDoList()
            .then((res) => {
                    setState(res.data);
                }
            )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "Vue.JS";
        todoListApi.createTodolist(title)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '78146ee6-f086-423f-b05e-53db429a7dab';
    useEffect(() => {
        todoListApi.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '78146ee6-f086-423f-b05e-53db429a7dab';
    const title = 'CSS-3';
    useEffect(() => {
        todoListApi.updateTodolistTitle(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

