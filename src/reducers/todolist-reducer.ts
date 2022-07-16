import {FilterValueType, TodoListType} from "../App";

type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
    id: string
}
export type ChangeTodolistFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValueType
}
export type ChangeTodolistTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodolistFilterAT | ChangeTodolistTitleAT

export const todolistsReducer = (todolists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodoList: TodoListType = {
                id: action.id,
                title: action.title,
                filter: "all"
            }
            return [...todolists, newTodoList]
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(tl => tl.id === action.id
                ? {...tl, filter: action.filter}
                : tl)
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(tl => tl.id === action.id
                ? {...tl, title: action.title}
                : tl)
        default:
            return todolists
    }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => ({type: "REMOVE-TODOLIST", id})
export const AddTodoListAC = (title: string, id: string): AddTodoListAT => ({type: "ADD-TODOLIST", id, title})
export const ChangeTodolistFilterAC = (id: string, filter: FilterValueType): ChangeTodolistFilterAT =>
    ({type: "CHANGE-TODOLIST-FILTER", id, filter})
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT => ({
    type: "CHANGE-TODOLIST-TITLE",
    id,
    title
})

