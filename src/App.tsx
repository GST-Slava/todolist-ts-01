import React, {useState} from "react";
import './App.css';
import {TaskType, Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed';

type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

type TasksStateType = {
    [todoListID: string]: Array<TaskType>
}

export const App = () => {

    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Chocolate", isDone: true},
            {id: v1(), title: "Meat", isDone: false},
            {id: v1(), title: "Water", isDone: false},
        ]
    })
    console.log(tasks);

    const removeTask = (id: string, todoListID: string) => {
        const currentTodoListTasks = tasks[todoListID]
        const updatedTasks = currentTodoListTasks.filter(t => t.id !== id)
        tasks[todoListID] = updatedTasks
        setTasks({...tasks})
        //далее 2 строки кода одинаковые
        //setTasks({...tasks})
        //setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t=> t.id !== id
    }
    const addTask = (title: string, todoListID: string) => {
        const newTask: TaskType = {
            id: v1(), title: title, isDone: false
        }
        const currentTodoListsTasks = tasks[todoListID]
        const updatedTasks = [newTask, ...currentTodoListsTasks]
        setTasks({...tasks, [todoListID]: updatedTasks})
        //setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]}) аналогичный код
    }
    const changeTodoListFilter = (newFilterValue: FilterValueType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: newFilterValue} : tl));
    }
    const changeTaskStatus = (tasksID: string, isDone: boolean, todoListID: string) => {
        const currentTodoListTasks = tasks[todoListID]
        const updatedTasks = currentTodoListTasks.map(t => t.id === tasksID ? {...t, isDone} : t)
        tasks[todoListID] = updatedTasks
        setTasks({...tasks})
        // setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === tasksID ? {...t, isDone} : t)}) аналогичная запись
    }
    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }


    const getTasksForRender = (todoList: TodoListType) => {
        let tasksForRender = tasks[todoList.id]
        if (todoList.filter === 'active') {
            tasksForRender = tasks[todoList.id].filter(t => !t.isDone)
        }
        if (todoList.filter === 'completed') {
            tasksForRender = tasks[todoList.id].filter(t => t.isDone)
        }
        return tasksForRender
    }


    const todoListComponents = todoLists.length
        ? todoLists.map(tl => {
            return (
                <Todolist
                    key={tl.id}
                    todoListID={tl.id}
                    title={tl.title}
                    tasks={getTasksForRender(tl)}
                    filter={tl.filter}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeTodoListFilter={changeTodoListFilter}
                    changeTaskStatus={changeTaskStatus}
                    removeTodoList={removeTodoList}
                />
            )
        })
        : <span>Create your first TodoList!</span>

    return (
        <div className="App">
            {todoListComponents}
        </div>
    );
}