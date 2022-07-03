import React, {ChangeEvent} from "react";
import './todoList.component.css';
import {FilterValueType} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import EditableString from "../EditableString/EditableString";

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

export const Todolist = (props: TodoListPropsType) => {

    const tasksJSXElements = props.tasks.length
        ? props.tasks.map(t => {
            const removeTask = () => props.removeTask(t.id, props.todoListID)
            const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
            const changeTaskTitle = (taskTitle: string) => {
                props.changeTaskTitle(t.id, taskTitle, props.todoListID)
            }
            const taskClasses = t.isDone ? 'is-done' : '';
            return (
                <li key={t.id}
                    className={taskClasses}>
                    <input
                        type="checkbox"
                        onChange={changeStatus}
                        checked={t.isDone}
                    />
                    <EditableString changeTitle={changeTaskTitle} title={t.title}/>
                    <button onClick={removeTask}>✖</button>
                </li>
            )
        })
        : <span>List is empty</span>

    const changeFilter = (filter: FilterValueType) => {
        return () => props.changeTodoListFilter(filter, props.todoListID)
    }
    const addTask = (title: string) => props.addTask(title, props.todoListID)
    const removeTodolist = () => props.removeTodoList(props.todoListID)
    const changeTodolistTitle = (todoListTitle: string) => props.changeTodolistTitle(todoListTitle, props.todoListID)

    const allBtnClasses = props.filter === 'all' ? 'active-filter' : ''
    const activeBtnClasses = props.filter === 'active' ? 'active-filter' : ''
    const completedBtnClasses = props.filter === 'completed' ? 'active-filter' : ''

    return (
        <div>
            <h3>
                <EditableString title={props.title} changeTitle={changeTodolistTitle}/>
                <button className='delButton' onClick={removeTodolist}>Del</button>
            </h3>
            <AddItemForm addItem={addTask}/>
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
