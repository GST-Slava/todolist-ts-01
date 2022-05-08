import React, {useState} from "react";
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";

export const App = () => {
    /*const tasks = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "ReactJS", isDone: false}
    ]*/

    let [tasks, setTasks] = useState([
            {id: 1, title: "HTML&CSS", isDone: true},
            {id: 2, title: "JS", isDone: true},
            {id: 3, title: "ReactJS", isDone: false},
            {id: 4, title: "ReactJS", isDone: false}
        ]
    )

    const removeTask = (id: number) => {
        setTasks(tasks.filter((el) => el.id !== id))
    }

    const changeFilter = (filterValue: string) => {
        console.log(filterValue)
    }

    let colander = tasks.filter(el => !el.isDone)

    return (
        <div className="App">
            <Todolist
                title='What to learn'
                tasks={colander}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />

        </div>
    )
}
