import React, {useReducer} from "react";
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodoListAC, TodoDomainType,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolist-api";

export type TasksStateType = {
    [todoListID: string]: Array<TaskType>
}

export const AppWithReducer = () => {
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, dispatchToTodoLists] = useReducer(todolistsReducer, [
        {id: todoListID_1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todoListID_2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID_1]: [
            {
                id: v1(),
                title: "HTML&CSS",
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
            },

        ],
        [todoListID_2]: [
            {
                id: v1(),
                title: "Bread",
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
                title: "Chocolate",
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
        let action = removeTaskAC(id, todoListID)
        dispatchToTasks(action)
    }

    const addTask = (title: string, todoListID: string) => {
        dispatchToTasks(addTaskAC(title, todoListID))
    }

    const changeTaskStatus = (tasksID: string, status: TaskStatuses, todoListID: string) => {
        dispatchToTasks(changeTaskStatusAC(tasksID, status, todoListID))
    }

    const changeTaskTitle = (tasksID: string, title: string, todoListID: string) => {
        dispatchToTasks(changeTaskTitleAC(tasksID, title, todoListID))
    }

    const changeTodoListFilter = (newFilterValue: FilterValuesType, todoListID: string) => {
        dispatchToTodoLists(changeTodolistFilterAC(todoListID, newFilterValue))
    }

    const changeTodolistTitle = (title: string, todoListID: string) => {
        dispatchToTodoLists(changeTodolistTitleAC(title, todoListID))
    }
    const removeTodoList = (todoListID: string) => {
        let action = removeTodoListAC(todoListID)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }
    const addTodolist = (title: string) => {
        let action = addTodoListAC(title)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
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