import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AppWithRedux} from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from './state/store';

export default {
    title: 'TODOLIST/AppWithRedux',
    component: AppWithRedux,
    argTypes: {},
} as ComponentMeta<typeof AppWithRedux>;


const Template: ComponentStory<typeof AppWithRedux> = (args) => <Provider store={store}><AppWithRedux/></Provider>;

export const AppWithReduxStory = Template.bind({});
AppWithReduxStory.args = {};
