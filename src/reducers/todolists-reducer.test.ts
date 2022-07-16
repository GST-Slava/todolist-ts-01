import {v1} from "uuid";
import {FilterValueType, TodoListType} from "../App";
import {
    AddTodoListAC,
    ChangeTodolistFilterAC,
    ChangeTodolistFilterAT, ChangeTodolistTitleAC, ChangeTodolistTitleAT,
    RemoveTodoListAC,
    todolistsReducer
} from "./todolist-reducer";

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todolistsReducer(startState, RemoveTodoListAC(todolistId2))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId1);
})

test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist"

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todolistsReducer(startState, AddTodoListAC(newTodolistTitle, v1()))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
})

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValueType = 'completed';

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const action: ChangeTodolistFilterAT = ChangeTodolistFilterAC(todolistId2, newFilter)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
})

test('correct todolist should be change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const action: ChangeTodolistTitleAT = ChangeTodolistTitleAC(todolistId2, newTodolistTitle)

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
})

