import React, {useState} from "react";
import './buttonDeleteTask.css';

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    //changeFilter: (filterValue: string) => void
}

type FiltersValueType = 'All' | 'Active' | 'Completed'

export const Todolist = (props: PropsType) => {

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


    return (
        <div>
            <div>
                <div>
                    <h3>{props.title}</h3>
                    <div>
                        <input/>
                        <button>+</button>
                    </div>

                    <ul>
                        {colander.map((el, index) => {
                            return (
                                <li key={el.id}>
                                    <button onClick={() => props.removeTask(el.id)} className='buttonDeleteTask'>X
                                    </button>
                                    <input type='checkbox' checked={el.isDone}/>
                                    <span>{el.title}</span>
                                </li>
                            )
                        })}
                    </ul>
                    <div>
                        <button onClick={() => changeFilter('All')}>All</button>
                        <button onClick={() => changeFilter('Active')}>Active</button>
                        <button onClick={() => changeFilter('Completed')}>Completed</button>
                    </div>
                </div>
            </div>
        </div>
    )
}