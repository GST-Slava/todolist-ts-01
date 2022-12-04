import React, {useEffect, useState} from 'react'
import {TodolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TodolistAPI.getTodoLists()
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "NewTodolist axios post"
        TodolistAPI.createTodo(title)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '6c48176a-839d-400d-ac6a-756ade37a0d5';
        TodolistAPI.deleteTodo(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = 'a3699f1e-0ed6-4cde-b6d6-a8c0e921fa1d';
        const title = 'Update Title TodoList'
        TodolistAPI.updateTodoTitle({title, todolistId})
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'a3699f1e-0ed6-4cde-b6d6-a8c0e921fa1d'
        TodolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'a3699f1e-0ed6-4cde-b6d6-a8c0e921fa1d'
    useEffect(() => {
        const title = "New Task axios post"
        TodolistAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'a3699f1e-0ed6-4cde-b6d6-a8c0e921fa1d'
    const taskId = '3e1ef1c8-49f9-4214-83d7-c6905f514774'

    useEffect(() => {
        TodolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
/*export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'a3699f1e-0ed6-4cde-b6d6-a8c0e921fa1d'
    const taskId = 'aa12955a-630c-401e-8088-4d447844145f'
}*/

/*

    useEffect(() => {
        const title = "Update Task Title"
        TodolistAPI.updateTask(todolistId, taskId,)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
*/
