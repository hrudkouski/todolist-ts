import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {
    fetchTodolistsTC, addTodolistTC, removeTodolistTC,
    changeTodoListFilterAC, changeTodoListTitleTC,
    FilterValuesType, TodoListDomainType
} from "./todolists-reducer";
import {addTaskTC, removeTaskTC, TaskStateType, updateTaskTC} from "./tasks-reducer";
import React, {useCallback, useEffect} from "react";
import {TaskStatuses} from "../../api/todoList-api";
import {Grid, Paper} from "@material-ui/core";
import {Todolist} from "./Todolist/Todolist";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";

type TodolistsListPropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<TodolistsListPropsType> = ({demo = false}) => {
    // BLL:
    const todoLists = useSelector<AppRootStateType, TodoListDomainType[]>(state => state.todoLists);
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks);
    const dispatch = useDispatch();

    useEffect(() => {
        if (demo) return
        dispatch(fetchTodolistsTC());
    }, [dispatch])

    // TodoLists
    const addTodoList = useCallback((title: string) => {
        if (demo) return
        dispatch(addTodolistTC(title))
    }, [dispatch])

    const deleteTodoList = useCallback((todoListID: string) => {
        if (demo) return
        dispatch(removeTodolistTC(todoListID));
    }, [dispatch])

    const changeTodolistTitle = useCallback((newTitle: string, todoListID: string) => {
        if (demo) return
        dispatch(changeTodoListTitleTC(newTitle, todoListID));
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todoListID: string) => {
        if (demo) return
        dispatch(changeTodoListFilterAC(todoListID, value))
    }, [dispatch])

    // Tasks
    const removeTask = useCallback((taskID: string, todoListID: string) => {
        if (demo) return
        dispatch(removeTaskTC(taskID, todoListID))
    }, [dispatch])

    const addTask = useCallback((title: string, todoListID: string) => {
        if (demo) return
        dispatch(addTaskTC(title, todoListID))
    }, [dispatch])

    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todoListID: string) => {
        if (demo) return
        dispatch(updateTaskTC(taskId, {status}, todoListID))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListID: string) => {
        if (demo) return
        dispatch(updateTaskTC(taskId, {title: newTitle}, todoListID))
    }, [dispatch])

    const todoListsComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={20} style={{padding: '15px'}}>
                    <Todolist
                        todoList={tl}
                        deleteTodoList={deleteTodoList}
                        tasks={tasks[tl.id]}
                        addTask={addTask}
                        changeTaskTitle={changeTaskTitle}
                        changeTaskStatus={changeTaskStatus}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        changeTodolistTitle={changeTodolistTitle}
                        demo={demo}
                    />
                </Paper>
            </Grid>
        )
    })

    return <>
        <Grid container style={{padding: '20px 0'}}>
            <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid
            container spacing={3}
            style={{justifyContent: 'space-evenly'}}>
            {todoListsComponents}
        </Grid>
    </>
}