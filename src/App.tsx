import React, {useReducer} from 'react';
import './App.css';
import {v1} from "uuid";
import {TasksType, Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemsForm/AddItemForm";
import {addTaskAC, apdateTaskAC, chengeCheckBoxStatusAC, removeTaskAC, TasksReducer} from "./reducers/tasksReducer";
import {filteredTaskAC, TodolistReducer} from "./reducers/todolistsReducer";

export type todolistType = {
    id: string
    titleTodolist: string
    filter: string
}

export type StateType = {
    [key: string]: Array<TasksType>
}

function App() {
    const todolistID_1 = v1();
    const todolistID_2 = v1();

    let [todolists, dispatchTodolists] = useReducer(TodolistReducer, [
        {id: todolistID_1, titleTodolist: 'What to learn', filter: 'All'},
        {id: todolistID_2, titleTodolist: 'What to read', filter: 'All'},
    ]);

    let [tasks, dispatchTasks] = useReducer(TasksReducer, {
        [todolistID_1]: [
            {id: v1(), task: "название1 из инпут", isDone: false},
            {id: v1(), task: "название2 из инпут", isDone: true},
            {id: v1(), task: "название3 из инпут", isDone: true},
        ],
        [todolistID_2]: [
            {id: v1(), task: "название1 из инпут", isDone: false},
            {id: v1(), task: "название2 из инпут", isDone: true},
            {id: v1(), task: "название3 из инпут", isDone: true},
        ]
    });

    const removeTask = (todolistID: string, taskID: string) => {
        // const copyTasks = {...tasks};
        // copyTasks[todolistID] = tasks[todolistID].filter(t => t.id !== taskID); //функция удаления
        // setTasks(copyTasks)
        dispatchTasks(removeTaskAC(todolistID, taskID))
    }

    const addTask = (todolistID: string, value: string) => { //функция добавить таску через инпут
        // const copyTasks = {...tasks};
        // copyTasks[todolistID] = [{id: v1(), task: value, isDone: false}, ...tasks[todolistID]];
        // setTasks(copyTasks);
        dispatchTasks(addTaskAC(todolistID, value))
    }


    const chengeCheckBoxStatus = (todolistID: string, id: string, value: boolean) => {
        // {...tasks,[todolistID]:tasks[todolistID].map(m=>m.id===id ? {...m,isDone:value}: m)
        dispatchTasks(chengeCheckBoxStatusAC(todolistID, id, value));
    }

    const filteredTask = (todolistID:string,value: string) => {
        //setTodolist(todolist.map(m=> m.id===todolistID ? {...m,filter:value}: m)
        dispatchTodolists(filteredTaskAC( todolistID,value))
    }
    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(f => f.id !== todolistID))
    }
    const addTodolists = (titleTodolist: string) => {
        const newTodolistID = v1();
        setTodolists([...todolists, {id: newTodolistID, titleTodolist: titleTodolist, filter: 'All'}])
        setTasks({...tasks, [newTodolistID]: []});
    }
    const apdateTask = (todolistID: string, taskID: string, title: string) => {
        // const copyTask = {...tasks};
        // copyTask[todolistID] = tasks[todolistID].map(t => t.id === taskID ? {...t, task: title} : t);
        // setTasks(copyTask);
        dispatchTasks(apdateTaskAC(todolistID, taskID, title));
    }
    const titleTodolist = (title: string, todolistID: string) => {
        setTodolists(todolists.map(m => todolistID === m.id ? {...m, titleTodolist: title} : m));
    }


    return (
        <div className="App">
            <AddItemForm addTask={addTodolists}/>
            <div className={'appWrapper'}>
                {todolists.map(m => {
                    let tasksFilter = tasks[m.id];

                    if (m.filter === 'Active') {

                        tasksFilter = tasks[m.id].filter(f => f.isDone); //в массив данных записывается профильтрованный массив данных и он уходит в тудулист по пропсам
                    }
                    if (m.filter === 'Completed') {

                        tasksFilter = tasks[m.id].filter(f => !f.isDone);
                    }
                    return (
                        <Todolist
                            key={m.id}
                            todolistID={m.id}
                            title={m.titleTodolist}
                            //@ts-ignore
                            tasks={tasksFilter}
                            removeTask={removeTask}
                            filteredTask={filteredTask}
                            addTask={addTask}
                            chengeCheckBoxStatus={chengeCheckBoxStatus}
                            filter={m.filter}
                            removeTodolist={removeTodolist}
                            apdateTask={apdateTask}
                            titleTodolist={titleTodolist}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default App;
