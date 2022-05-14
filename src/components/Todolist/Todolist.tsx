import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import './todoList.component.css';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    //changeFilter: (filterValue: string) => void
    addTask: (title: string) => void
}

type FiltersValueType = 'All' | 'Active' | 'Completed'

export const Todolist = (props: PropsType) => {

    let [newTaskTitle, setTitle] = useState('')

    const [filterForColander, setFilterForColander] = useState<FiltersValueType>('All')
    const changeFilter = (filterValue: FiltersValueType) => {
        setFilterForColander(filterValue)
        console.log(filterValue)
    }
    let colander = props.tasks
    if (filterForColander === 'Active') {
        colander = props.tasks.filter(el => !el.isDone)
    }
    if (filterForColander === 'Completed') {
        colander = props.tasks.filter(el => el.isDone)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(newTaskTitle);
            setTitle('');
        }
    }


    return (
        <div>
            <div>
                <div>
                    <h3>{props.title}</h3>
                    <div>
                        <input value={newTaskTitle}
                               onChange={onChangeHandler}
                               onKeyPress={onKeyPressHandler}
                        />
                        <button className='buttonAddTask' onClick={() => {
                            props.addTask(newTaskTitle);
                            setTitle('');
                        }}>+
                        </button>
                    </div>

                    <ul className='noDoted'>
                        {colander.map((el, index) => {
                            return (
                                <li key={el.id}>
                                    <button onClick={() => props.removeTask(el.id)} className='buttonDeleteTask'>✖
                                    </button>
                                    <input type='checkbox' checked={el.isDone}/>
                                    <span>{el.title}</span>
                                </li>
                            )
                        })}
                    </ul>
                    <div>
                        <button className='buttonFilter' onClick={(e) => changeFilter('All')}><span>All</span></button>
                        <button className='buttonFilter' onClick={(e) => changeFilter('Active')}><span>Active</span></button>
                        <button className='buttonFilter' onClick={(e) => changeFilter('Completed')}><span>Completed</span></button>
                    </div>
                </div>
            </div>
        </div>
    )
}