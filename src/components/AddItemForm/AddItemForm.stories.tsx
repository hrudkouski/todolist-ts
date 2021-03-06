import React from 'react';
import {Story, Meta} from '@storybook/react';
import {AddItemForm, AddItemFormType} from "./AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title: 'todolist-ts/components/AddItemForm',
    component: AddItemForm,
    argTypes: {
        onClick: {
            description: 'Button inside form clicked'
        },
    },
} as Meta;

const Template: Story<AddItemFormType> = (args) => <AddItemForm {...args} />;

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
    addItem: action('Button clicked inside components'),
};

export const AddItemFormDisabled = Template.bind({});
AddItemFormDisabled.args = {
    addItem: action('Button disabled '),
    disabled: true
};
