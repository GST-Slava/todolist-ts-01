import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import './todoList.component.css';
import cs from './Todolist.module.css'
import {FiltersValueType} from "../../App";
import {CheckBox} from "../CheckBox/CheckBox";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FiltersValueType) => void
    addTask: (title: string) => void
    changeIsDone: (id: string, isDone: boolean) => void
    filter: FiltersValueType
}


export const Todolist = (props: PropsType) => {

    let [error, setError] = useState<string | null>(null)

    let [title, setTitle] = useState('')

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim());
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter('all');
    const onActiveClickHandler = () => props.changeFilter('active');
    const onCompletedClickHandler = () => props.changeFilter('completed');


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} className={error ? cs.error : ''}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button className='buttonAddTask' onClick={addTask}>+</button>
            {error && <div className={cs.errorMessage}>{error}</div>}
        </div>

        <ul className='noDoted'>
            {props.tasks.map(t => {

                const onClickHandler = () => props.removeTask(t.id)
                /*const changeIsDoneHandler = (event: ChangeEvent<HTMLInputElement>) => {
                    props.changeIsDone(t.id, event.currentTarget.checked)
                }*/

                const changeIsDoneHandler = (tId: string, isDone: boolean) => {
                    props.changeIsDone(tId, isDone)
                }

                return (
                    <li key={t.id} className={t.isDone ? cs.isDone : ''}>
                        <CheckBox isDone={t.isDone} callBack={(isDone) => changeIsDoneHandler(t.id, isDone)}/>
                        {/*<input type='checkbox' checked={t.isDone}
                               onChange={(event) => changeIsDoneHandler(t.id, event)}/>*/}
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>✖</button>
                    </li>
                )
            })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? cs.activeFilter : ''} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? cs.activeFilter : ''} onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? cs.activeFilter : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
};
