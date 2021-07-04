import React from 'react';
import {Story, Meta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task, TasksPropsType} from "./Task";
import {TaskPriorities, TaskStatuses} from "../../../../api/todoList-api";

export default {
    title: 'todolist-ts/components/Task',
    component: Task,
} as Meta;

const removeTaskCallback = action('Remove task clicked');
const changeTaskStatusCallback = action('Change Task Status Clicked');
const changeTaskTitleCallback = action('Change Task Title Clicked');

const Template: Story<TasksPropsType> = (args) => <Task {...args}/>;

const baseArg = {
    removeTask: removeTaskCallback,
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArg,
    task: {
        id: '1', title: 'React', status: TaskStatuses.Completed,
        description: '', priority: TaskPriorities.Low, startDate: '',
        deadline: '', todoListId: 'todoListID_1', order: 0, addedDate: ''
    },
    todoListID: 'todoListID_1',
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArg,
    task: {
        id: '2', title: 'React', status: TaskStatuses.New,
        description: '', priority: TaskPriorities.Low, startDate: '',
        deadline: '', todoListId: 'todoListID_2', order: 0, addedDate: ''
    },
    todoListID: 'todoListID_2',
};
