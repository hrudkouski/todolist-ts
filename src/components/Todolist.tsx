import React, {useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {TaskStatuses, TasksType} from "../api/todoList-api";
import { FilterValuesType } from "../store/todolists-reducer";

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
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoListID: string) => void
    changeTodolistTitle: (newTitle: string, todoListID: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {

    const {
        title,
        todoListID,
        tasks,
        changeTaskTitle,
        deleteTodoList,
        filter,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        changeTodolistTitle,
    } = props;

    const onClickAllFilter = useCallback(() => changeFilter('all', todoListID), [changeFilter, todoListID])

    const onClickActiveFilter = useCallback(() => changeFilter('active', todoListID), [changeFilter, todoListID])

    const onClickCompletedFilter = useCallback(() => changeFilter('completed', todoListID), [changeFilter, todoListID])

    const onClickDeleteTodoList = useCallback(() => deleteTodoList(todoListID), [deleteTodoList, todoListID])

    const changeTodolistTitleHandler = useCallback((title: string) => {
        changeTodolistTitle(title, todoListID)
    }, [changeTodolistTitle, todoListID])

    const addTaskHandler = useCallback((title: string) => {
        addTask(title, todoListID)
    }, [addTask, todoListID])

    let tasksForTodolist = tasks;
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }

    const tasksFor = tasksForTodolist.map(t => {
        return <Task
            task={t}
            key={t.id}
            removeTask={removeTask}
            todoListID={todoListID}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
        />
    })

    return (
        <div>
            <div>
                <h3>
                    <EditableSpan
                        value={title}
                        changeTitle={changeTodolistTitleHandler}
                    />
                    <IconButton onClick={onClickDeleteTodoList}>
                        <Delete color="secondary"/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTaskHandler}/>
                <div style={{listStyle: 'none', paddingLeft: '0'}}>
                    {
                        tasksFor
                    }
                </div>
                <div>
                    <Button
                        style={{marginLeft: '3px'}}
                        color={"primary"}
                        variant={filter === 'all' ? 'contained' : 'outlined'}
                        onClick={onClickAllFilter}>All
                    </Button>
                    <Button
                        style={{marginLeft: '3px'}}
                        color={"primary"}
                        variant={filter === 'active' ? 'contained' : 'outlined'}
                        onClick={onClickActiveFilter}>Active
                    </Button>
                    <Button
                        style={{marginLeft: '3px'}}
                        color={"primary"}
                        variant={filter === 'completed' ? 'contained' : 'outlined'}
                        onClick={onClickCompletedFilter}>Completed
                    </Button>
                </div>
            </div>
        </div>
    )
})