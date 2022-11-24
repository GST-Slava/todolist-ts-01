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
        return instance.post<CreateTodoType>('todo-lists', {title})
    },
    deleteTodo: (todolistId: string) => {
        return instance.delete<DeleteUpdateTodoType>(`todo-lists/${todolistId}`)
    },
    updateTodoTitle: (p: { todolistId: string, title: string }) => {
        return instance.put<DeleteUpdateTodoType>(`todo-lists/${p.todolistId}`, {title: p.title})
    }
}

type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type CreateTodoType = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: { item: TodoType }
}

type DeleteUpdateTodoType = {

    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: {}
}