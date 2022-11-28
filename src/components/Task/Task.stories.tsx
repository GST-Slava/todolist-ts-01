import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";

export default {
    title: 'TODOLIST/Task',
    component: Task,
} as ComponentMeta<typeof Task>;


const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    task: {
        id: 'qwe', title: 'JS', status: TaskStatuses.Completed, todoListId: 'todoListID_1',
        description: '', completed: false, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.Low
    },
    removeTask: action('removeTaskCallback'),
    changeTaskStatus: action('ChangeTaskStatusCallback'),
    changeTaskTitle: action('ChangeTaskTitleCallback'),
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    task: {id: 'qwe', title: 'HTML', status: TaskStatuses.New, todoListId: 'todoListID_2',
        description: '', completed: false, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.Low
    },
    removeTask: action('removeTaskCallback'),
    changeTaskStatus: action('ChangeTaskStatusCallback'),
    changeTaskTitle: action('ChangeTaskTitleCallback'),
};
