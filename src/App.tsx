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
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: false},
        {id: v1(), title: 'Code', isDone: true},
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
        // let newTasks = [newTask, ...tasks];
        //setTasks(newTasks);
        setTasks([newTask, ...tasks]);
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
                      tasks={getTaskForTodoList()}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    )
}

export default App;
