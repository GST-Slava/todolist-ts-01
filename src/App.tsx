import React, {useState} from "react";
import './App.css';
import {TaskType, Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";

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
    const changeTaskStatus = (tasksID: string, isDone: boolean, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === tasksID ? {...t, isDone} : t)})
        /*const currentTodoListTasks = tasks[todoListID]
        const updatedTasks = currentTodoListTasks.map(t => t.id === tasksID ? {...t, isDone} : t)
        tasks[todoListID] = updatedTasks
        setTasks({...tasks}) аналогичная запись*/
    }
    const changeTaskTitle = (tasksID: string, title: string, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === tasksID ? {...t, title: title} : t)})
    }

    const changeTodoListFilter = (newFilterValue: FilterValueType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: newFilterValue} : tl));
    }
    const changeTodolistTitle = (title: string, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title: title} : tl));
    }
    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }
    const addTodolist = (title: string) => {
        const newTodolistID = v1()
        setTodoLists([{id: newTodolistID, title, filter: 'all'}, ...todoLists])
        setTasks({...tasks, [newTodolistID]: []})
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
                    filter={tl.filter}
                    tasks={getTasksForRender(tl)}

                    addTask={addTask}
                    removeTask={removeTask}
                    changeTaskTitle={changeTaskTitle}
                    changeTaskStatus={changeTaskStatus}

                    removeTodoList={removeTodoList}
                    changeTodolistTitle={changeTodolistTitle}
                    changeTodoListFilter={changeTodoListFilter}
                />
            )
        })
        : <span>Create your first TodoList!</span>

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todoListComponents}
        </div>
    );
}