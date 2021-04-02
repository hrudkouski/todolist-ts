import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {

    const tasks1 = [
        {id: 1, title: 'React', isDone: false},
        {id: 2, title: 'JS', isDone: false},
        {id: 3, title: 'HTML+CSS', isDone: true},
    ]

    const tasks2 = [
        {id: 1, title: 'Todolist', isDone: true},
        {id: 2, title: 'Native JS', isDone: false},
        {id: 3, title: 'Git', isDone: true},
    ]

    const tasks3 = [
        {id: 1, title: 'Football', isDone: true},
        {id: 2, title: 'Books', isDone: true},
        {id: 3, title: 'Music', isDone: true},
    ]

    return (
        <div className="App">
            <Todolist title='Coding' tasks={tasks1}/>
            <Todolist title='Learn' tasks={tasks2}/>
            <Todolist title='Relax' tasks={tasks3}/>
        </div>
    )
}

export default App;
