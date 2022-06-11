import React, {useState} from "react";
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";

export type FiltersValueType = 'all' | 'active' | 'completed';

export const App = () => {
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false}
    ]);
    console.log(tasks);

    const removeTask = (id: string) => {
        let filteredTask = tasks.filter(t => t.id != id);
        setTasks(filteredTask)
    }

    const changeIsDone = (id: string, isDone: boolean) => {
        setTasks(tasks.map(el => el.id === id ? {...el, isDone: isDone} : el))
    }

    const addTask = (title: string) => {
        let task = {id: v1(), title: title, isDone: false};
        let newTask = [task, ...tasks];
        setTasks(newTask)
    }

    let [filter, setFilter] = useState<FiltersValueType>('all');

    let taskForTodolist = tasks;

    if (filter === 'active') {
        taskForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === 'completed') {
        taskForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FiltersValueType) {
        setFilter(value);
    }


    return (
        <div className="App">
            <Todolist title='What to learn'
                      tasks={taskForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeIsDone={changeIsDone}
                      filter={filter}
            />
        </div>
    );
}