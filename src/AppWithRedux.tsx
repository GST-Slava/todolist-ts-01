import React, {useCallback} from "react";
import './App.css';
import {TaskType, Todolist} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodoListAC,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValueType = 'all' | 'active' | 'completed';
export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TasksStateType = {
    [todoListID: string]: Array<TaskType>
}

export const AppWithRedux = () => {

    let todolists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    let dispatch = useDispatch()


    const removeTask = (id: string, todoListID: string) => {
        let action = removeTaskAC(id, todoListID)
        dispatch(action)
    }

    const addTask = (title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
    }

    const changeTaskStatus = (tasksID: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(tasksID, isDone, todoListID))
    }

    const changeTaskTitle = (tasksID: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(tasksID, title, todoListID))
    }

    const changeTodoListFilter = (newFilterValue: FilterValueType, todoListID: string) => {
        dispatch(changeTodolistFilterAC(todoListID, newFilterValue))
    }

    const changeTodolistTitle = (title: string, todoListID: string) => {
        dispatch(changeTodolistTitleAC(title, todoListID))
    }
    const removeTodoList = (todoListID: string) => {
        let action = removeTodoListAC(todoListID)
        dispatch(action)
    }
    const addTodolist = useCallback((title: string) => {
        let action = addTodoListAC(title)
        dispatch(action)
    }, [])

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


    const todoListComponents = todolists.length
        ? todolists.map(tl => {
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
                        TodoLists
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