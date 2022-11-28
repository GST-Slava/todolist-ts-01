import React, {useState} from "react";
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolist-api";
import {FilterValuesType, TodoDomainType} from "./state/todolists-reducer";


export type TasksStateType = {
    [todoListID: string]: Array<TaskType>
}

export const App = () => {
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoDomainType>>([
        {
            id: todoListID_1,
            title: 'What to learn',
            filter: 'all',
            order: 0,
            addedDate: ''
        },
        {
            id: todoListID_2,
            title: 'What to buy',
            filter: 'all',
            order: 0,
            addedDate: ''
        }
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID_1]: [
            {
                id: v1(),
                title: "JS",
                todoListId: todoListID_1,
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
                todoListId: todoListID_1,
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
        [todoListID_2]: [
            {
                id: v1(),
                title: "JS",
                todoListId: todoListID_2,
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
                todoListId: todoListID_2,
                description: '',
                status: TaskStatuses.Completed,
                completed: false,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
        ]
    })
    console.log(tasks);

    const removeTask = (id: string, todoListID: string) => {
        const currentTodoListTasks = tasks[todoListID]
        const updatedTasks = currentTodoListTasks.filter(t => t.id !== id)
        tasks[todoListID] = updatedTasks
        setTasks({...tasks})
    }
    const addTask = (title: string, todoListID: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: "JS",
            todoListId: todoListID,
            description: '',
            status: TaskStatuses.New,
            completed: false,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low
        }
        const currentTodoListsTasks = tasks[todoListID]
        const updatedTasks = [newTask, ...currentTodoListsTasks]
        setTasks({...tasks, [todoListID]: updatedTasks})
        //setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]}) аналогичный код
    }
    const changeTaskStatus = (tasksID: string, status: TaskStatuses, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === tasksID ? {...t, status} : t)})
    }
    const changeTaskTitle = (tasksID: string, title: string, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === tasksID ? {...t, title: title} : t)})
    }

    const changeTodoListFilter = (newFilterValue: FilterValuesType, todoListID: string) => {
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
        const newTodoList: TodoDomainType = {
            id: newTodolistID,
            title: title,
            filter: "all",
            addedDate: '',
            order: 0
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodolistID]: []})
    }

    const getTasksForRender = (todoList: TodoDomainType) => {
        let tasksForRender = tasks[todoList.id]
        if (todoList.filter === 'active') {
            tasksForRender = tasks[todoList.id].filter(t => t.status === TaskStatuses.New)
        }
        if (todoList.filter === 'completed') {
            tasksForRender = tasks[todoList.id].filter(t => t.status === TaskStatuses.Completed)
        }
        return tasksForRender
    }


    const todoListComponents = todoLists.length
        ? todoLists.map(tl => {
            return (
                <Grid item key={tl.id}>
                    <Paper

                        elevation={8}
                        style={{padding: '20px'}}
                        square
                    >
                        <Todolist
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
                    </Paper>
                </Grid>
            )
        })
        : <span>Create your first TodoList!</span>

    return (
        <div className="App">
            <AppBar position='static'>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu/>
                    </IconButton>
                    <Typography variant='h6'>
                        Todolists
                    </Typography>
                    <Button color='inherit' variant={'outlined'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '10px 0px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}