import React, {memo, useCallback} from "react";
import './todoList.component.css';
import {FilterValueType} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import EditableString from "../EditableString/EditableString";
import {Button, IconButton, List} from "@material-ui/core";
import {DeleteTwoTone} from "@material-ui/icons";
import {Task} from "../Task/Task";


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

export const Todolist = memo(({
                                  todoListID,
                                  title,
                                  tasks,
                                  filter,
                                  addTask,
                                  removeTask,
                                  changeTodoListFilter,
                                  changeTaskStatus,
                                  changeTaskTitle,
                                  changeTodolistTitle,
                                  removeTodoList,

                              }: TodoListPropsType) => {
    console.log('TodoList')
    let tasksForTodolist = tasks;
    if (filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
    }

    const removeTask1 = useCallback((taskId: string) => removeTask(taskId, todoListID), [removeTask, todoListID])
    const changeTaskStatus1 = useCallback((taskId: string, status: boolean) => {
        changeTaskStatus(taskId, status, todoListID)
    }, [changeTaskStatus, todoListID])
    const changeTaskTitle1 = useCallback((taskId: string, title: string) => {
        changeTaskTitle(taskId, title, todoListID)
    }, [changeTaskTitle, todoListID])


    const changeFilter = (filter: FilterValueType) => {
        return () => changeTodoListFilter(filter, todoListID)
    }
    const addTask1 = useCallback((title: string) => {
        addTask(title, todoListID)
    }, [todoListID, addTask])

    const removeTodolist1 = () => removeTodoList(todoListID)
    const changeTodolistTitle1 = (todoListTitle: string) => changeTodolistTitle(todoListTitle, todoListID)

    /* const allBtnClasses = props.filter === 'all' ? 'active-filter' : ''
     const activeBtnClasses = props.filter === 'active' ? 'active-filter' : ''
     const completedBtnClasses = props.filter === 'completed' ? 'active-filter' : ''*/

    return (
        <div>
            <h3>
                <EditableString title={title} changeTitle={changeTodolistTitle1}/>
                <IconButton
                    size={'small'}
                    color={'secondary'}
                    onClick={removeTodolist1}>
                    <DeleteTwoTone/>
                </IconButton>
                {/*<button className='delButton' onClick={removeTodolist}>Del</button>*/}
            </h3>
            <AddItemForm addItem={addTask1}/>
            <List>
                {
                    tasksForTodolist.map(t => {
                        return <Task
                            key={t.id}
                            task={t}
                            removeTask={removeTask1}
                            changeTaskStatus={changeTaskStatus1}
                            changeTaskTitle={changeTaskTitle1}/>
                    })
                }
            </List>
            <div>
                <Button
                    size={'small'}
                    color={filter === 'all' ? 'secondary' : 'primary'}
                    variant={'contained'}
                    onClick={changeFilter('all')}>All</Button>
                <Button
                    size={'small'}
                    color={filter === 'active' ? 'secondary' : 'primary'}
                    variant={'contained'}
                    onClick={changeFilter('active')}>Active</Button>
                <Button
                    size={'small'}
                    color={filter === 'completed' ? 'secondary' : 'primary'}
                    variant={'contained'}
                    onClick={changeFilter('completed')}>Completed</Button>
            </div>
        </div>
    );
});
