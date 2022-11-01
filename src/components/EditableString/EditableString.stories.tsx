import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import EditableString from "./EditableString";

export default {
    title: 'TODOLIST/EditableString',
    component: EditableString,
} as ComponentMeta<typeof EditableString>;


const Template: ComponentStory<typeof EditableString> = (args) => <EditableString {...args} />;

export const EditableStringExample = Template.bind({});
EditableStringExample.args = {
    title: "abcd12345",
    changeTitle: action('Value EditableString changed ')
};

