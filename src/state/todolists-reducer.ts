import {v1} from "uuid";
import {TodoType} from "../api/todolist-api";

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
}
export type ChangeTodolistFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}
export type ChangeTodolistTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}

export type FilterValuesType = 'all' | 'active' | 'completed';

export type ActionsType = RemoveTodoListAT | AddTodoListAT | ChangeTodolistFilterAT | ChangeTodolistTitleAT

let initialState: Array<TodoDomainType> = []

export type TodoDomainType = TodoType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodoDomainType> = initialState, action: ActionsType): Array<TodoDomainType> => {
    switch (action.type) {
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

export const removeTodoListAC = (id: string): RemoveTodoListAT => ({type: "REMOVE-TODOLIST", id})
export const addTodoListAC = (title: string): AddTodoListAT => ({
    type: "ADD-TODOLIST",
    todolistId: v1(),
    title: title
})
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterAT =>
    ({type: "CHANGE-TODOLIST-FILTER", id, filter})
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT => ({
    type: "CHANGE-TODOLIST-TITLE",
    id,
    title
})
export const setTodolistsAC = (todos: any) => {
    return {
        type: 'SET-TODOS',
        todos
    }
}

