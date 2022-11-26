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
    updateTask: (todolistId: string, taskId: string, title: string) => {
        return instance.put<BaseResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },

}

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

/*type UpdateTaskModelType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}*/

type GetTasksResponse = {
    items: TaskType[]
    totalCount: number
    error: string | null
}

type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type BaseResponseType<T> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: T
}