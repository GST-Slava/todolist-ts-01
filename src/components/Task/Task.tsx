import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import EditableString from "../EditableString/EditableString";
import {DeleteTwoTone} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../api/todolist-api";

type TaskPropsType = {
    task: TaskType
    removeTask: (task: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (taskId: string, title: string) => void
}

export const Task = memo(({
                              task,
                              removeTask,
                              changeTaskStatus,
                              changeTaskTitle
                          }: TaskPropsType) => {
    console.log('Task')
    const onClickHandler = () => removeTask(task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(task.id, TaskStatuses.Completed);//замена  e.currentTarget.checked
    }
    const onTitleChangeHandler = (taskTitle: string) => {
        changeTaskTitle(task.id, taskTitle);
    }

    return (
        <ListItem key={task.id}
                  style={{padding: '0px'}}
        >
            <Checkbox
                size={'small'}
                color={'primary'}
                onChange={onChangeHandler}
                checked={task.status === TaskStatuses.Completed}
            />
            <EditableString changeTitle={onTitleChangeHandler} title={task.title}/>
            <IconButton
                size={'small'}
                color={'secondary'}
                onClick={onClickHandler}>
                <DeleteTwoTone/>
            </IconButton>
            {/*<button onClick={removeTask}>✖</button>*/}
        </ListItem>
    );
});