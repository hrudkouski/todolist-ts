import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType, TasksType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskID: string) => void;
    changeFilter: (value: FilterValuesType) => void;
    addTask: (title: string) => void
    filter: FilterValuesType
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
}

export function Todolist(props: TodolistPropsType) {

    const [error, setError] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('')

    const onClickAddTask = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError(true);
        }
        setTitle('');
    };

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTask();
        }
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        setError(false);
    }

    const onClickAllFilter = () => props.changeFilter('all');
    const onClickActiveFilter = () => props.changeFilter('active');
    const onClickCompletedFilter = () => props.changeFilter('completed');

    const {filter} = props;

    const errorMessage = error
        ? <div className={'error-message'}>Title is required</div>
        : null;

    const tasks = props.tasks.map(t => {
        const removeTaskHandler = () => props.removeTask(t.id);
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked);
        return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                <input
                    onChange={onChangeHandler}
                    type="checkbox"
                    checked={t.isDone}/>
                <span>{t.title}</span>
                <button
                    className='button-removed'
                    onClick={removeTaskHandler}>x
                </button>
            </li>
        )
    });

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input
                        className={error ? 'error' : ''}
                        value={title}
                        onKeyPress={onKeyPressAddTask}
                        onChange={onChangeTitle}
                    />
                    <button onClick={onClickAddTask}>+</button>
                    {errorMessage}
                </div>
                <ul>
                    {tasks}
                </ul>
                <div>
                    <button className={filter === 'all' ? 'active-filter' : ''} onClick={onClickAllFilter}>All
                    </button>
                    <button className={filter === 'active' ? 'active-filter' : ''}
                            onClick={onClickActiveFilter}>Active
                    </button>
                    <button className={filter === 'completed' ? 'active-filter' : ''}
                            onClick={onClickCompletedFilter}>Completed
                    </button>
                </div>
            </div>
        </div>
    )
}