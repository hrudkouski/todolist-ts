import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task/Task";
import {TaskStatuses, TasksType} from "../../../api/todoList-api";
import {FilterValuesType, TodoListDomainType} from "../todolists-reducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "../tasks-reducer";

type TodolistPropsType = {
    todoList: TodoListDomainType
    tasks: Array<TasksType>
    changeTaskTitle: (taskId: string, title: string, todoListID: string) => void
    deleteTodoList: (todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void;
    changeFilter: (value: FilterValuesType, todoListID: string) => void;
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoListID: string) => void
    changeTodolistTitle: (newTitle: string, todoListID: string) => void
    demo?: boolean
}

export const Todolist = React.memo((props: TodolistPropsType) => {

    const {
        todoList,
        tasks,
        changeTaskTitle,
        deleteTodoList,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        changeTodolistTitle,
        demo = false,
    } = props;

    const dispatch = useDispatch();

    useEffect(() => {
        if (demo) return;
        dispatch(fetchTasksTC(todoList.id));
    }, [todoList.id, dispatch])

    const onClickAllFilter = useCallback(() => changeFilter('all', todoList.id), [changeFilter, todoList.id])

    const onClickActiveFilter = useCallback(() => changeFilter('active', todoList.id), [changeFilter, todoList.id])

    const onClickCompletedFilter = useCallback(() => changeFilter('completed', todoList.id), [changeFilter, todoList.id])

    const onClickDeleteTodoList = useCallback(() => deleteTodoList(todoList.id), [deleteTodoList, todoList.id])

    const changeTodolistTitleHandler = useCallback((title: string) => {
        changeTodolistTitle(title, todoList.id)
    }, [changeTodolistTitle, todoList.id])

    const addTaskHandler = useCallback((title: string) => {
        addTask(title, todoList.id)
    }, [addTask, todoList.id])

    let tasksForTodolist = tasks;
    if (todoList.filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    if (todoList.filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }

    const tasksFor = tasksForTodolist.map(t => {
        return <Task
            disabled={todoList.entityStatus === 'loading'}
            task={t}
            key={t.id}
            removeTask={removeTask}
            todoListID={todoList.id}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
        />
    })

    return (
        <div>
            <div>
                <h3>
                    <EditableSpan
                        value={todoList.title}
                        changeTitle={changeTodolistTitleHandler}
                        disabled={todoList.entityStatus === 'loading'}
                    />
                    <IconButton
                        disabled={todoList.entityStatus === 'loading'}
                        onClick={onClickDeleteTodoList}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm
                    disabled={todoList.entityStatus === 'loading'}
                    addItem={addTaskHandler}/>
                <div style={{listStyle: 'none', paddingLeft: '0'}}>
                    {tasksFor}
                </div>
                <div>
                    <Button
                        style={{marginLeft: '3px'}}
                        color={"primary"}
                        variant={todoList.filter === 'all' ? 'contained' : 'outlined'}
                        onClick={onClickAllFilter}>All
                    </Button>
                    <Button
                        style={{marginLeft: '3px'}}
                        color={"primary"}
                        variant={todoList.filter === 'active' ? 'contained' : 'outlined'}
                        onClick={onClickActiveFilter}>Active
                    </Button>
                    <Button
                        style={{marginLeft: '3px'}}
                        color={"primary"}
                        variant={todoList.filter === 'completed' ? 'contained' : 'outlined'}
                        onClick={onClickCompletedFilter}>Completed
                    </Button>
                </div>
            </div>
        </div>
    )
})