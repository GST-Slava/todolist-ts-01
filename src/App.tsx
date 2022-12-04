import React, {useCallback, useEffect} from "react";
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "./api/todolist-api";
import {
    addTodoListAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, fetchTodosThunk,
    FilterValuesType,
    removeTodoListAC,
    TodoDomainType
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const App = () => {

    const todolists = useSelector<AppRootStateType, Array<TodoDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchTodosThunk)
    }, [])

    const removeTask = useCallback(function (id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId);
        dispatch(action);
    }, []);

    const addTask = useCallback(function (title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId);
        dispatch(action);
    }, []);

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        const action = changeTaskStatusAC(id, status, todolistId);
        dispatch(action);
    }, []);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(id, newTitle, todolistId);
        dispatch(action);
    }, []);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        const action = removeTodoListAC(id);
        dispatch(action);
    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        const action = changeTodolistTitleAC(id, title);
        dispatch(action);
    }, []);

    const addTodolist = useCallback((title: string) => {
        const action = addTodoListAC(title);
        dispatch(action);
    }, [dispatch]);

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
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];

                            return (
                                <Grid item key={tl.id}>
                                    <Paper elevation={8}
                                           style={{padding: '20px'}}
                                           square>
                                        <Todolist
                                            todoListID={tl.id}
                                            title={tl.title}
                                            filter={tl.filter}
                                            tasks={allTodolistTasks}
                                            addTask={addTask}
                                            removeTask={removeTask}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTaskStatus={changeStatus}
                                            removeTodoList={removeTodolist}
                                            changeTodolistTitle={changeTodolistTitle}
                                            changeTodoListFilter={changeFilter}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}