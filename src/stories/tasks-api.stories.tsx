import React, {useEffect, useState} from 'react'
import {todoListApi} from "../api/todoList-api";

export default {
    title: 'Tasks API'
}

export const GetTasksForTodolist = () => {
    const [state, setState] = useState<any>(null);
    const todolistId = '78860cd4-d55d-4a1c-9f82-91dda214422d';

    useEffect(() => {
        todoListApi.getTasksForTodolist(todolistId)
            .then((res) => {
                    setState(res.data);
                }
            )
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTaskForTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '78860cd4-d55d-4a1c-9f82-91dda214422d';
    const title = "Thunk";

    useEffect(() => {
        todoListApi.createTaskForTodolist(todolistId, title)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTaskFromTodolist = () => {
    const [state, setState] = useState<any>(null);
    const todolistId = '793486d1-e2d5-4c00-ab86-8976bad6e145';
    const taskId = 'ff09ff26-b5bd-4ab4-bc3c-84392dd049da';

    useEffect(() => {
        todoListApi.deleteTaskFromTodolist(todolistId, taskId)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTaskForTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '793486d1-e2d5-4c00-ab86-8976bad6e145';
    const taskId = '694719ec-b9bb-476e-bf74-ea8253155ea5';
    const title = 'What is VUE.JS???';

    useEffect(() => {
        todoListApi.updateTaskForTodolist(todolistId, taskId, title)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

