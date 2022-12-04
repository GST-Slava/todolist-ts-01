import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import EditableString from "../EditableString/EditableString";
import {DeleteTwoTone} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../api/todolist-api";

type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Task = memo((props: TaskPropsType) => {
    const onClickHandler = useCallback(() => props.removeTask(props.task.id, props.todolistId),
        [props.task.id, props.todolistId]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }, [props.task.id, props.todolistId]);


    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.task.id, props.todolistId]);

    return (
        <ListItem key={props.task.id}
                  style={{padding: '0px'}}
        >
            <Checkbox
                size={'small'}
                color={'primary'}
                onChange={onChangeHandler}
                checked={props.task.status === TaskStatuses.Completed}
            />
            <EditableString changeTitle={onTitleChangeHandler} title={props.task.title}/>
            <IconButton
                size={'small'}
                color={'secondary'}
                onClick={onClickHandler}>
                <DeleteTwoTone/>
            </IconButton>
        </ListItem>
    );
});