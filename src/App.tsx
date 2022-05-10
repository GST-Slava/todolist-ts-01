import React, {useState} from "react";
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";

export const App = () => {
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false}
    ]);
    console.log(tasks);

    const addTask = (title: string) => {
        let task = {
            id: v1(),
            title: title,
            isDone: false
        };
        let newTask = [task, ...tasks];
        setTasks(newTask)
    }


    const removeTask = (id: string) => {
        setTasks(tasks.filter((el) => el.id !== id))
    }

    return (
        <div className="App">
            <Todolist
                title='What to learn'
                tasks={tasks}
                removeTask={removeTask}
                addTask={addTask}
            />
        </div>
    );
}