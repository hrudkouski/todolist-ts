import React, {ChangeEvent} from "react";
import {FilterValuesType, TasksType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type TodolistPropsType = {
    title: string
    todoListID: string
    tasks: Array<TasksType>
    changeTaskTitle: (taskId: string, title: string, todoListID: string) => void
    deleteTodoList: (todoListID: string) => void
    filter: FilterValuesType
    removeTask: (taskID: string, todoListID: string) => void;
    changeFilter: (value: FilterValuesType, todoListID: string) => void;
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todoListID: string) => void
    changeTodolistTitle: (newTitle: string, todoListID: string) => void
}

export function Todolist(props: TodolistPropsType) {

    const {filter} = props;

    const onClickAllFilter = () => props.changeFilter('all', props.todoListID);
    const onClickActiveFilter = () => props.changeFilter('active', props.todoListID);
    const onClickCompletedFilter = () => props.changeFilter('completed', props.todoListID);

    const onClickDeleteTodoList = () => props.deleteTodoList(props.todoListID);

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(title, props.todoListID)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.todoListID);
    }

    const tasks = props.tasks.map(t => {
        const removeTaskHandler = () => props.removeTask(t.id, props.todoListID);

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID);

        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.todoListID);
        }

        return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                <input
                    onChange={onChangeHandler}
                    type="checkbox"
                    checked={t.isDone}/>
                <EditableSpan
                    changeTitle={changeTaskTitle}
                    title={t.title}/>
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
                <h3>
                    <EditableSpan
                        title={props.title}
                        changeTitle={changeTodolistTitle}
                    />
                    <button onClick={onClickDeleteTodoList}>x</button>
                </h3>
                <AddItemForm addItem={addTask}/>
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