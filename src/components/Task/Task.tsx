import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import EditableString from "../EditableString/EditableString";
import {DeleteTwoTone} from "@material-ui/icons";
import {TaskType} from "../Todolist/Todolist";

type TaskPropsType = {
    task: TaskType
    removeTask: (task: string) => void
    changeTaskStatus: (taskId: string, status: boolean) => void
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
        changeTaskStatus(task.id, e.currentTarget.checked);
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
                checked={task.isDone}
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