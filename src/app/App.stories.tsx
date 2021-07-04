import React from 'react';
import {Story, Meta} from '@storybook/react';
import App from "./App";
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";

export default {
    title: 'todolist-ts/components/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator],
} as Meta;

const Template: Story = () => <App/>

export const AppExample = Template.bind({});
AppExample.args = {};
