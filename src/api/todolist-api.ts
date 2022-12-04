import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '158bd753-3b6f-4b35-b06d-ba25c4d96974'
    }
})


export const TodolistAPI = {

    getTodoLists: () => {
        return instance.get<TodoType[]>('todo-lists')
    },
    createTodo: (title: string) => {
        return instance.post<BaseResponseType<{ item: TodoType }>>('todo-lists', {title})
    },
    deleteTodo: (todolistId: string) => {
        return instance.delete<BaseResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    updateTodoTitle: (p: { todolistId: string, title: string }) => {
        return instance.put<BaseResponseType<{}>>(`todo-lists/${p.todolistId}`, {title: p.title})
    },

    getTasks: (todolistId: string) => {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask: (todolistId: string, title: string) => {
        return instance.post<BaseResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title: title})
    },
    deleteTask: (todolistId: string, taskId: string) => {
        return instance.delete<BaseResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask: (todolistId: string, taskId: string, model: UpdateTaskModelType) => {
        return instance.put<BaseResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },

}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    id: string
    title: string
    todoListId: string
    description: string
    status: TaskStatuses
    completed: boolean
    startDate: string
    deadline: string
    addedDate: string
    order: number
    priority: TaskPriorities
}

type UpdateTaskModelType = {
    title: string
    description: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

type GetTasksResponse = {
    items: TaskType[]
    totalCount: number
    error: string | null
}

export type TodoType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type BaseResponseType<T> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: T
}