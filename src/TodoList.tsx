import React from "react";

type TodoListPropsType = {
    title: string,
    name?: number,
    tasks: Array<inArrayType>
}

type inArrayType = {
    id: number,
    title: string,
    isDone: boolean
}

export const TodoList = (props: TodoListPropsType) => {
    return <div>
        <h3>{props.title}</h3>
        <div>{props.name}</div>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>
            <li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>
            <li><input type="checkbox" checked={false}/> <span>{}</span></li>
        </ul>
        <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    </div>
}