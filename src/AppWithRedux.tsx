import React, {useCallback} from "react";
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodoListAC, TodoDomainType,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType} from "./api/todolist-api";

export type TasksStateType = {
    [todoListID: string]: Array<TaskType>
}

export const AppWithRedux = () => {

    let todoLists = useSelector<AppRootStateType, Array<TodoDomainType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    let dispatch = useDispatch()


    const removeTask = useCallback((id: string, todoListID: string) => {
        let action = removeTaskAC(id, todoListID)
        dispatch(action)
    }, [dispatch])
    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
    }, [dispatch])
    const changeTaskStatus = useCallback((tasksID: string, status: TaskStatuses, todoListID: string) => {
        dispatch(changeTaskStatusAC(tasksID, status, todoListID))
    }, [dispatch])
    const changeTaskTitle = useCallback((tasksID: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(tasksID, title, todoListID))
    }, [dispatch])
    const changeTodoListFilter = useCallback((newFilterValue: FilterValuesType, todoListID: string) => {
        dispatch(changeTodolistFilterAC(todoListID, newFilterValue))
    }, [dispatch])
    const changeTodolistTitle = useCallback((title: string, todoListID: string) => {
        dispatch(changeTodolistTitleAC(title, todoListID))
    }, [dispatch])
    const removeTodoList = useCallback((todoListID: string) => {
        let action = removeTodoListAC(todoListID)
        dispatch(action)
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        let action = addTodoListAC(title)
        dispatch(action)
    }, [dispatch])


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
                    {
                        todoLists.map(tl => {
                            return <Grid item key={tl.id}>
                                <Paper
                                    elevation={8}
                                    style={{padding: '20px'}}
                                    square
                                >
                                    <Todolist
                                        todoListID={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
                                        tasks={tasks[tl.id]}
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
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}