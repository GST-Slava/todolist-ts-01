import React from "react";
import {Provider} from "react-redux";
import {combineReducers, legacy_createStore} from 'redux'
import {tasksReducer} from './state/tasks-reducer';
import {todolistsReducer} from './state/todolists-reducer';
import {v1} from 'uuid';
import {AppRootStateType} from './state/store';
import {TaskPriorities, TaskStatuses} from "./api/todolist-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(),
                title: "HTML&CSS",
                todoListId: 'todoListID_1',
                description: '',
                status: TaskStatuses.Completed,
                completed: false,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                title: "JS",
                todoListId: 'todoListID_1',
                description: '',
                status: TaskStatuses.Completed,
                completed: false,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(),
                title: "Milk",
                todoListId: 'todoListID_2',
                description: '',
                status: TaskStatuses.Completed,
                completed: false,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                title: "React Book",
                todoListId: 'todoListID_2',
                description: '',
                status: TaskStatuses.Completed,
                completed: false,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            }
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: () => JSX.Element) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}