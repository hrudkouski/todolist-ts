import React from 'react';
import {Story, Meta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {EditableSpan, EditableSpanType} from "./EditableSpan";

export default {
    title: 'todolist-ts/components/EditableSpan',
    component: EditableSpan,
    argTypes: {
        changeTitle: {
            description: 'Value EditableSpan changed'
        },
        value: {
            defaultValue: 'HTML',
            description: 'Start value EditableSpan',
        },
    },
} as Meta;

const Template: Story<EditableSpanType> = (args) => <EditableSpan {...args}/>;

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    changeTitle: action('Value EditableSpan changed'),
};

export const EditableSpanDisabledExample = Template.bind({});
EditableSpanDisabledExample.args = {
    changeTitle: action('Value EditableSpan changed'),
    disabled: true
};