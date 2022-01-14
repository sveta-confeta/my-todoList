import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TasksType, Todolist} from "./Todolist";
 type todolistType={
     id:string
     titleTodolist:string
     filter:string
 }

 type StateType={
     [key:string]: Array<TasksType>
 }
function App() {
    const todolistID_1=v1();
    const todolistID_2=v1();

    let [todolists,setTodolists]=useState<Array<todolistType>>([
        {id: todolistID_1,titleTodolist:'What to learn',filter:'All'},
        {id: todolistID_2,titleTodolist:'What to read',filter:'All'},
    ])

    const todolistTitle: string = "Tasks";



    let [tasks, setTasks] = useState<StateType>({
      [todolistID_1]  : [
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

    const removeTask = (taskID: string,todolistID:string) => {
        const copyTasks = {...tasks};
        copyTasks[todolistID]=tasks[todolistID].filter(t => t.id !== taskID); //функция удаления
        setTasks(copyTasks)
    }

    const addTask = (value:string,todolistID:string) => { //функция добавить таску через инпут
        const copyTasks={...tasks};
        copyTasks[todolistID]=[ {id: v1(), task : value, isDone: false},...tasks[todolistID]];
        setTasks( copyTasks);
    }

    const chengeCheckBoxStatus=(id:string,value:boolean,todolistID:string)=>{
        const copyTasks={...tasks};
       copyTasks[todolistID]=tasks[todolistID].map(m=>m.id===id ? {...m,isDone:value}: m)
        setTasks(copyTasks)
    }

    const filteredTask = (value: string,todolistID:string) => {
        setFilter(value);
    }


    return (
        <div className="App">
            {todolists.map(m=>{
                if (m.filter === 'Active') {
                    tasks = tasks.filter(f => f.isDone); //в массив данных записывается профильтрованный массив данных и он уходит в тудулист по пропсам
                }
                if (m.filter === 'Completed') {
                    tasks = tasks.filter(f => !f.isDone);
                }
                return(
                    <Todolist
                        key={m.id}
                        todolistID={m.id}
                        titleTodolist={m.titleTodolist}
                        title={todolistTitle}
                        tasks={tasks}
                        removeTask={removeTask}
                        filteredTask={filteredTask}
                        addTask={addTask}
                        chengeCheckBoxStatus={chengeCheckBoxStatus}
                        filter={m.filter}
                    />
                )
            })}


        </div>
    );
}

export default App;
