import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./Todolist";

function App() {

    const todolistTitle: string = "Tasks";

    let [tasks, setTasks] = useState([
        {id: v1(), task: "название1 из инпут", isDone: false},
        {id: v1(), task: "название2 из инпут", isDone: true},
        {id: v1(), task: "название3 из инпут", isDone: true},
    ]);

    const removeTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id)); //функция удаления
    }


    const addTask = (value:string) => { //функция добавить таску через инпут
        let newTask = {id: v1(), task : value, isDone: true};
        setTasks( [newTask,...tasks]);

    }

    let [filter, setFilter] = useState('All');


    if (filter === 'Active') {
        tasks = tasks.filter(f => f.isDone); //в массив данных записывается профильтрованный массив данных и он уходит в тудулист по пропсам
    }
    if (filter === 'Completed') {
        tasks = tasks.filter(f => !f.isDone);
    }

    const filteredTask = (value: string) => {
        setFilter(value);
    }
   const chengeCheckBoxStatus=(id:string,value:boolean)=>{
      setTasks(tasks.map(m=>m.id===id ? {...m,isDone:value}: m))
   }

    return (
        <div className="App">
            {/*<AddTodolist tasks={}/>*/}
            <Todolist
                title={todolistTitle}
                tasks={tasks}
                removeTask={removeTask}
                filteredTask={filteredTask}
                addTask={addTask}
                chengeCheckBoxStatus={chengeCheckBoxStatus}
            />

        </div>
    );
}

export default App;
