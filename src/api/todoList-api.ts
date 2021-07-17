import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '3af7a44d-0a6b-4bf7-b34b-b5730fa5756f'
    }
})

// Types
export type CommonResponseType<T = {}> = {
    resultCode: number
    fieldsError: string[]
    messages: string[]
    data: T
}
export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type TasksType = {
    description: string | null
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string | null
    deadline: string | null
    id: string
    todoListId: string
    order: number
    addedDate: string | null
}
export type UpdateTaskModelType = {
    description: string | null
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string | null
    deadline: string | null
}
type TasksResponseType = {
    error: null | string
    items: TasksType[]
    totalCount: number
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
export type AuthMeResponseType = {
    id: number
    email: string
    login: string
}

// Api
export const todoListApi = {
    getToDoList() {
        return instance.get<TodoListType[]>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<CommonResponseType<{ item: TodoListType }>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(title: string, todolistId: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title})
    },
    getTasksForTodolist(todolistId: string) {
        return instance.get<TasksResponseType>(`todo-lists/${todolistId}/tasks`);
    },
    createTaskForTodolist(title: string, todolistId: string) {
        return instance.post<CommonResponseType<{ item: TasksType }>>(`todo-lists/${todolistId}/tasks`, {title});
    },
    deleteTaskFromTodolist(taskId: string, todolistId: string,) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    updateTaskForTodolist(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<CommonResponseType<TasksType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
}
export const authAPI = {
    logIn(data: LoginParamsType) {
        return instance.post<CommonResponseType<{ userId: number }>>('auth/login', data)
    },
    authMe() {
        return instance.get<CommonResponseType<AuthMeResponseType>>('auth/me')
    },
    logOut() {
        return instance.delete<CommonResponseType>('auth/login')
    },
}


