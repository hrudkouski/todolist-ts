import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '3af7a44d-0a6b-4bf7-b34b-b5730fa5756f'
    }
})

type ToDoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type TaskType = {
    description: string | null
    title: string
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
    id: string
    todoListId: string
    order: number
    addedDate: string | null
}

type TasksResponseType = {
    error: null | string
    items: TaskType[]
    totalCount: number
}

type CommonResponseType<T = {}> = {
    resultCode: number
    fieldsError: string[]
    messages: string[]
    data: T
}

export const todoListApi = {
    getToDoList() {
        return instance.get<ToDoListType[]>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<CommonResponseType<{item: ToDoListType}>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title})
    },
    getTasksForTodolist(todolistId: string) {
        return instance.get<TasksResponseType>(`todo-lists/${todolistId}/tasks`);
    },
    createTaskForTodolist(todolistId: string, title: string) {
        return instance.post<CommonResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title});
    },
    deleteTaskFromTodolist(todolistId: string, taskId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    updateTaskForTodolist(todolistId: string, taskId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
    },
}

