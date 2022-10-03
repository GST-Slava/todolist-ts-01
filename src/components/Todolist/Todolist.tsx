import React, {ChangeEvent, memo, useCallback} from "react";
import './todoList.component.css';
import {FilterValueType} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import EditableString from "../EditableString/EditableString";
import {Button, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import {DeleteTwoTone} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: TaskType[]
    filter: FilterValueType
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskId: string, todoListID: string) => void
    changeTodoListFilter: (filter: FilterValueType, todoListID: string) => void
    changeTaskStatus: (tasksID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (tasksID: string, title: string, todoListID: string) => void
    changeTodolistTitle: (title: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
}

export const Todolist = memo((props: TodoListPropsType) => {
    console.log('TodoList')
    let tasksForTodolist = props.tasks;
    if (props.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
    }

    const tasksJSXElements = props.tasks.length
        ? tasksForTodolist.map(t => {
            const removeTask = () => props.removeTask(t.id, props.todoListID)
            const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
            const changeTaskTitle = (taskTitle: string) => {
                props.changeTaskTitle(t.id, taskTitle, props.todoListID)
            }


            /*const taskClasses = t.isDone ? 'is-done' : '';*/
            return (
                <ListItem key={t.id}
                          style={{padding: '0px'}}
                >
                    <Checkbox
                        size={'small'}
                        color={'primary'}
                        onChange={changeStatus}
                        checked={t.isDone}
                    />
                    <EditableString changeTitle={changeTaskTitle} title={t.title}/>
                    <IconButton
                        size={'small'}
                        color={'secondary'}
                        onClick={removeTask}>
                        <DeleteTwoTone/>
                    </IconButton>
                    {/*<button onClick={removeTask}>✖</button>*/}
                </ListItem>
            )
        })
        : <span>List is empty</span>

    const changeFilter = (filter: FilterValueType) => {
        return () => props.changeTodoListFilter(filter, props.todoListID)
    }
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todoListID)
    }, [props.todoListID, props.addTask])

    const removeTodolist = () => props.removeTodoList(props.todoListID)
    const changeTodolistTitle = (todoListTitle: string) => props.changeTodolistTitle(todoListTitle, props.todoListID)

    /* const allBtnClasses = props.filter === 'all' ? 'active-filter' : ''
     const activeBtnClasses = props.filter === 'active' ? 'active-filter' : ''
     const completedBtnClasses = props.filter === 'completed' ? 'active-filter' : ''*/

    return (
        <div>
            <h3>
                <EditableString title={props.title} changeTitle={changeTodolistTitle}/>
                <IconButton
                    size={'small'}
                    color={'secondary'}
                    onClick={removeTodolist}>
                    <DeleteTwoTone/>
                </IconButton>
                {/*<button className='delButton' onClick={removeTodolist}>Del</button>*/}
            </h3>
            <AddItemForm addItem={addTask}/>
            <List>
                {tasksJSXElements}
            </List>
            <div>
                <Button
                    size={'small'}
                    color={props.filter === 'all' ? 'secondary' : 'primary'}
                    variant={'contained'}
                    onClick={changeFilter('all')}>All</Button>
                <Button
                    size={'small'}
                    color={props.filter === 'active' ? 'secondary' : 'primary'}
                    variant={'contained'}
                    onClick={changeFilter('active')}>Active</Button>
                <Button
                    size={'small'}
                    color={props.filter === 'completed' ? 'secondary' : 'primary'}
                    variant={'contained'}
                    onClick={changeFilter('completed')}>Completed</Button>
            </div>
        </div>
    );
});
