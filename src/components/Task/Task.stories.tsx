import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";

export default {
    title: 'TODOLIST/Task',
    component: Task,
} as ComponentMeta<typeof Task>;


const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    task: {id: 'qwe', title: 'JS', isDone: true},
    removeTask: action('removeTaskCallback'),
    changeTaskStatus: action('ChangeTaskStatusCallback'),
    changeTaskTitle: action('ChangeTaskTitleCallback'),
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    task: {id: 'qwe', title: 'HTML', isDone: false},
    removeTask: action('removeTaskCallback'),
    changeTaskStatus: action('ChangeTaskStatusCallback'),
    changeTaskTitle: action('ChangeTaskTitleCallback'),
};
