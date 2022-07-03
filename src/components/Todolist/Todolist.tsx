import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import './todoList.component.css';
import {FilterValueType} from "../../App";

type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListFilter: (filter: FilterValueType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (tasksID: string, isDone: boolean, todoListID: string) => void
    filter: FilterValueType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TodoListPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<boolean>(false)

    const tasksJSXElements = props.tasks.length
        ? props.tasks.map(t => {
            const removeTask = () => props.removeTask(t.id, props.todoListID)
            const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
            const taskClasses = t.isDone ? 'is-done' : '';
            return (
                <li key={t.id}>
                    <input
                        type="checkbox"
                        onChange={changeStatus}
                        checked={t.isDone}
                    />
                    <span className={taskClasses}>{t.title}</span>
                    <button onClick={removeTask}>✖</button>
                </li>
            )
        })
        : <span>List is empty</span>

    const changeFilter = (filter: FilterValueType) => {
        return () => props.changeTodoListFilter(filter, props.todoListID)
    }

    const addTask = () => {
        const taskTitle = title.trim()
        if (taskTitle) {
            props.addTask(taskTitle, props.todoListID)
        } else {
            setError(true)
        }
        setTitle('')
    }

    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTask()
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const taskTitle = e.currentTarget.value.trim()
        setTitle(e.currentTarget.value)
        if (error && taskTitle) setError(false)
        if (!error && !taskTitle) setError(true)
    }

    const allBtnClasses = props.filter === 'all' ? 'active-filter' : ''
    const activeBtnClasses = props.filter === 'active' ? 'active-filter' : ''
    const completedBtnClasses = props.filter === 'completed' ? 'active-filter' : ''
    const errorInputStyle = error ? {border: '2px solid red', outline: 'none'} : undefined

    return (
        <div>
            <h3>{props.title}
                <button onClick={() => props.removeTodoList(props.todoListID)}>✖</button>
            </h3>
            <div>
                <input
                    style={errorInputStyle}
                    value={title}
                    onChange={onChangeSetTitle}
                    onKeyDown={onKeyDownAddTask}
                />
                <button onClick={addTask}>+</button>
                {error && <div style={{color: 'red', fontWeight: 'bold'}}>Title is required!</div>}
            </div>

            <ul>
                {tasksJSXElements}
            </ul>

            <div>
                <button className={allBtnClasses} onClick={changeFilter('all')}>All</button>
                <button className={activeBtnClasses} onClick={changeFilter('active')}>Active</button>
                <button className={completedBtnClasses} onClick={changeFilter('completed')}>Completed</button>
            </div>
        </div>
    );
};
