import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodolistAC,
    todoListsReducer
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTitleStatusAC, removeTasksAC, tasksReducer} from "./store/tasks-reducer";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]: Array<TasksType>
}
export type FilterValuesType = 'all' | 'active' | 'completed';

function AppWithReducers() {
    //BLL:
    const todoListID_1 = v1();
    const todoListID_2 = v1();

    const [todoLists, dispatchSetTodoLists] = useReducer(todoListsReducer, [
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to bye', filter: 'all'},
    ])

    const [tasks, dispatchSetTasks] = useReducer(tasksReducer, {
        [todoListID_1]: [
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'CSS', isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Salt', isDone: false},
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Butter', isDone: false},
        ]
    })

    //TodoLists
    function addTodoList(title: string) {
        const action = addTodolistAC(title) // создать акшн, что бы была одна айди
        dispatchSetTodoLists(action)
        dispatchSetTasks(action)
    }

    function deleteTodoList(todoListID: string) {
        const action = removeTodolistAC(todoListID)
        dispatchSetTodoLists(action)
        dispatchSetTasks(action)
    }

    function changeTodolistTitle(newTitle: string, todoListID: string) {
        const action = changeTodoListTitleAC(todoListID, newTitle)
        dispatchSetTodoLists(action)
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        const action = changeTodoListFilterAC(todoListID, value)
        dispatchSetTodoLists(action)
    }

    //Tasks
    function removeTask(taskID: string, todoListID: string) {
        const action = removeTasksAC(taskID, todoListID)
        dispatchSetTasks(action)
    }

    function addTask(title: string, todoListID: string) {
        const action = addTaskAC(title, todoListID)
        dispatchSetTasks(action)
    }

    function changeTaskStatus(taskId: string, newIsDoneValue: boolean, todoListID: string) {
        const action = changeTaskStatusAC(taskId, newIsDoneValue, todoListID)
        dispatchSetTasks(action)
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListID: string) {
        const action = changeTitleStatusAC(taskId, newTitle, todoListID)
        dispatchSetTasks(action)
    }

    function getTaskForTodoList(todoList: TodoListType) {
        switch (todoList.filter) {
            case 'active':
                return tasks[todoList.id].filter(t => !t.isDone);
            case 'completed':
                return tasks[todoList.id].filter(t => t.isDone);
            default:
                return tasks[todoList.id];
        }
    }

    const todoListsComponents = todoLists.map(tl => {

        return (
            <Grid item key={tl.id}>
                <Paper elevation={20} style={{padding: '15px'}}>
                    <Todolist
                        todoListID={tl.id}
                        deleteTodoList={deleteTodoList}
                        tasks={getTaskForTodoList(tl)}
                        title={tl.title}
                        filter={tl.filter}
                        addTask={addTask}
                        changeTaskTitle={changeTaskTitle}
                        changeTaskStatus={changeTaskStatus}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    //UI:
    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    <Button
                        variant={'outlined'}
                        color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid
                    container spacing={3}
                    style={{justifyContent: 'space-evenly'}}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithReducers;
