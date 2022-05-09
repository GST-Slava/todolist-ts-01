import React, {useState} from "react";
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";

export const App = () => {
    /*const tasks = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Rest API", isDone: false}
        {id: 4, title: "GraphQL", isDone: false}
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

    return (
        <div className="App">
            <Todolist
                title='What to learn'
                tasks={tasks}
                removeTask={removeTask}
                // changeFilter={changeFilter}
            />
        </div>
    );
}