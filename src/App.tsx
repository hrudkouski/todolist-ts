import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from 'uuid';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
//BLL:

    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'HTML', isDone: false},
        {id: v1(), title: 'CSS', isDone: false},
        {id: v1(), title: 'Code', isDone: false},
        {id: v1(), title: 'Code.mu', isDone: false},
    ])

    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

    function removeTask(taskID: string) {
        const filteredTasks = tasks.filter((task) => task.id !== taskID);
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        const newTask: TasksType = {
            id: v1(),
            title,
            isDone: false
        }
        setTasks([newTask, ...tasks]);
    }

    function changeTaskStatus(taskId: string, newIsDoneValue: boolean) {
        setTasks(tasks.map(t =>
            t.id === taskId
                ? {...t, isDone: newIsDoneValue}
                : t))
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    function getTaskForTodoList() {
        switch (filter) {
            case 'active':
                return tasks.filter(t => !t.isDone);
            case 'completed':
                return tasks.filter(t => t.isDone);
            default:
                return tasks;
        }
    }

//UI:
    return (
        <div className="App">
            <Todolist title='Coding'
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      tasks={getTaskForTodoList()}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      filter={filter}
            />
        </div>
    )
}

export default App;
