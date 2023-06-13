import {v1} from "uuid";
import {TodolistAPI, TodoType} from "../api/todolist-api";
import {Dispatch} from "redux";

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
}
export type ChangeTodolistTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}
export type ChangeTodolistFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}

export type ActionsType = RemoveTodoListAT | AddTodoListAT
    | ChangeTodolistFilterAT | ChangeTodolistTitleAT | SetTodosAT

const initialState: Array<TodoDomainType> = []

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodoDomainType = TodoType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodoDomainType> = initialState, action: ActionsType): Array<TodoDomainType> => {
    switch (action.type) {

        case "SET-TODOS": {
            return action.todos.map((item) => {
                return {...item, filter: 'all'}
            })
        }

        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id)
        }
        case "ADD-TODOLIST": {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: "all",
                addedDate: '',
                order: 0
            }, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-FILTER": {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.filter
            }
            return [...state]
        }
        default:
            return state;
    }
}

export const removeTodoListAC = (todolistId: string): RemoveTodoListAT =>
    ({type: "REMOVE-TODOLIST", id: todolistId})
export const addTodoListAC = (title: string): AddTodoListAT =>
    ({type: "ADD-TODOLIST", title, todolistId: v1()})
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT =>
    ({type: "CHANGE-TODOLIST-TITLE", id, title})
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterAT =>
    ({type: "CHANGE-TODOLIST-FILTER", id, filter})

export const setTodolistsAC = (todos: TodoType[]) => {
    return {
        type: 'SET-TODOS',
        todos
    } as const
}

export type SetTodosAT = ReturnType<typeof setTodolistsAC>

export const fetchTodosTC = () => (dispatch: Dispatch) => {
    TodolistAPI.getTodoLists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
}

/*export const fetchTodosTC = () => {
    return (dispatch: Dispatch) => {
        TodolistAPI.getTodoLists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}*/



