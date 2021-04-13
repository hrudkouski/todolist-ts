import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType, TasksType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskID: string) => void;
    changeFilter: (value: FilterValuesType) => void;
    addTask: (title: string) => void
}

export function Todolist(props: TodolistPropsType) {

    const [title, setTitle] = useState<string>('')

    const tasks = props.tasks.map(t => {

        const removeTask = () => props.removeTask(t.id);

        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    });

    const onClickAddTask = () => {
        props.addTask(title)
        setTitle('');
    }; // или писать код сразу в онКлике

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTask();
        }
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

    const onClickAllFilter = () => props.changeFilter('all');

    const onClickActiveFilter = () => props.changeFilter('active');

    const onClickCompletedFilter = () => props.changeFilter('completed');

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input
                        value={title}
                        onKeyPress={onKeyPressAddTask}
                        onChange={onChangeTitle}
                    />
                    <button onClick={onClickAddTask}>+</button>
                </div>
                <ul>
                    {tasks}
                </ul>
                <div>
                    <button onClick={onClickAllFilter}>All</button>
                    <button onClick={onClickActiveFilter}>Active</button>
                    <button onClick={onClickCompletedFilter}>Completed</button>
                </div>
            </div>
        </div>
    )
}