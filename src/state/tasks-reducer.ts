import {TasksStateType} from "../App";
import {AddTodoListAT, RemoveTodoListAT, SetTodosAT} from "./todolists-reducer";
import {TaskStatuses, TaskType, TodolistAPI} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";


type RemoveTaskAT = ReturnType<typeof removeTaskAC>
type AddTaskAT = ReturnType<typeof addTaskAC>
type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
export type FetchTasksAT = ReturnType<typeof fetchTasksAC>


let initialState: TasksStateType = {}

export type ActionType = RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodoListAT
    | RemoveTodoListAT
    | SetTodosAT
    | FetchTasksAT

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {

        case  'SET-TODOS': {
            const stateCopy = {...state}
            action.todos.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case "FETCH-TASKS": {
            /*const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy*/
            return {...state, [action.todolistId]: action.tasks}
        }

        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case "ADD-TASK": {
            let newTask = action.task
            const stateCopy = {...state}
            const tasks = stateCopy[newTask.todoListId]
            const newTasks = [newTask, ...tasks]
            stateCopy[newTask.todoListId] = newTasks
            return stateCopy
        }


        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    status: action.status
                } : t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId
                    ? {...t, title: action.title}
                    : t)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolistId]: []
            }
        case "REMOVE-TODOLIST": {
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
            //const {[action.id]: [], ...rest} = {...state}
            //return rest
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: "REMOVE-TASK", taskId, todolistId} as const
}
export const addTaskAC = (task: TaskType): AddTaskAT => {
    return {type: "ADD-TASK", task} as const
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return {type: "CHANGE-TASK-STATUS", taskId, status, todolistId} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: "CHANGE-TASK-TITLE", taskId, title, todolistId} as const
}
export const fetchTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {type: 'FETCH-TASKS', todolistId, tasks} as const
}


//thunk
export const fetchTasksTC = (todoId: string) => {
    return (dispatch: Dispatch) => {
        TodolistAPI.getTasks(todoId)
            .then((res) => {
                const tasks = res.data.items
                dispatch(fetchTasksAC(todoId, tasks))
            })
    }
}

export const deleteTaskTC = (todoId: string, taskId: string) => (dispatch: Dispatch) => {
    TodolistAPI.deleteTask(todoId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(taskId, todoId));
        })
}

export const addTaskTC = (todoId: string, title: string) => (dispatch: Dispatch) => {
    TodolistAPI.createTask(todoId, title)
        .then((res) => {
            const newTask = res.data.data
            dispatch(addTaskAC(newTask));
        })
}

export const updateTaskStatusTC = (todoId: string, taskId: string, status: TaskStatuses) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        TodolistAPI.updateTask(todoId, taskId, model)
        const model: any = {}
            .then((res) => {
                const action = changeTaskStatusAC(id, status, todolistId);
            })
    }

