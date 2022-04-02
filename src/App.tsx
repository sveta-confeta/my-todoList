import React, {useCallback, useReducer} from 'react';
import './App.css';
import {v1} from "uuid";
import {TasksType, Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemsForm/AddItemForm";
import {addTaskAC, apdateTaskAC, chengeCheckBoxStatusAC, removeTaskAC, TasksReducer} from "./reducers/tasksReducer";
import {
    addTodolistsAC,
    filteredTaskAC,
    removeTodolistAC,
    titleTodolistAC,
    TodolistReducer
} from "./reducers/todolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/redux-store";

export type todolistType = {
    id: string
    titleTodolist: string
    filter: string
}

export type StateType = {
    [key: string]: Array<TasksType>
}

function App() {
    // const todolistID_1 = v1();
    // const todolistID_2 = v1();

    // let [todolists, dispatchTodolists] = useReducer(TodolistReducer, [
    //     {id: todolistID_1, titleTodolist: 'What to learn', filter: 'All'},
    //     {id: todolistID_2, titleTodolist: 'What to read', filter: 'All'},
    // ]);
    //
    // let [tasks, dispatchTasks] = useReducer(TasksReducer, {
    //     [todolistID_1]: [
    //         {id: v1(), task: "название1 из инпут", isDone: false},
    //         {id: v1(), task: "название2 из инпут", isDone: true},
    //         {id: v1(), task: "название3 из инпут", isDone: true},
    //     ],
    //     [todolistID_2]: [
    //         {id: v1(), task: "название1 из инпут", isDone: false},
    //         {id: v1(), task: "название2 из инпут", isDone: true},
    //         {id: v1(), task: "название3 из инпут", isDone: true},
    //     ]
    // });

    const tasks=useSelector<AppRootStateType,StateType>(state=>state.tasks);
    const todolists=useSelector<AppRootStateType,Array<todolistType>>(state=>state.todolists);

    const dispatch=useDispatch() //1диспатч на все редьюсеры

    const removeTask =useCallback(  (todolistID: string, taskID: string) => {
        dispatch(removeTaskAC(todolistID, taskID))
    },[dispatch,removeTaskAC]);

    const addTask =useCallback(  (todolistID: string, value: string) => { //функция добавить таску через инпут
        // const copyTasks = {...tasks};
        // copyTasks[todolistID] = [{id: v1(), task: value, isDone: false}, ...tasks[todolistID]];
        // setTasks(copyTasks);
        dispatch(addTaskAC(todolistID, value))
    },[dispatch,addTaskAC])


    const chengeCheckBoxStatus =useCallback( (todolistID: string, id: string, value: boolean) => {
        // {...tasks,[todolistID]:tasks[todolistID].map(m=>m.id===id ? {...m,isDone:value}: m)
        dispatch(chengeCheckBoxStatusAC(todolistID, id, value));
    },[dispatch,chengeCheckBoxStatusAC])

    const filteredTask = useCallback((todolistID:string,value: string) => {
        //setTodolist(todolist.map(m=> m.id===todolistID ? {...m,filter:value}: m)
        dispatch(filteredTaskAC( todolistID,value))
    },[ dispatch,filteredTaskAC]);

    const removeTodolist =useCallback( (todolistID: string) => {
        // setTodolists(todolists.filter(f => f.id !== todolistID))
        dispatch(removeTodolistAC(todolistID))
    },[dispatch,removeTodolistAC]);

    const addTodolists =useCallback(  (titleTodolist: string) => {
        // [...todolists, {id: newTodolistID, titleTodolist: titleTodolist, filter: 'All' //для тодолистредьюсер
        // const newTodolistID = v1();
        // {...tasks, [newTodolistID]: []}//для таскредьюсер
        let action=addTodolistsAC(titleTodolist);//чтоб мы не повторяли вызов функции 2 раза
        dispatch(action);

    },[dispatch,addTodolistsAC])

    const apdateTask = useCallback((todolistID: string, taskID: string, title: string) => {
        // const copyTask = {...tasks};
        // copyTask[todolistID] = tasks[todolistID].map(t => t.id === taskID ? {...t, task: title} : t);
        // setTasks(copyTask);
        dispatch(apdateTaskAC(todolistID, taskID, title));
    },[ dispatch,apdateTaskAC]);

    const titleTodolist =useCallback( (todolistID: string,title: string) => {
        // setTodolists(todolists.map(m => todolistID === m.id ? {...m, titleTodolist: title} : m));
        dispatch(titleTodolistAC( todolistID,title))
    },[ dispatch,titleTodolistAC]);


    return (
        <div className="App">
            <AddItemForm addTask={addTodolists}/>
            <div className={'appWrapper'}>
                {todolists.map(m => {



                    return (
                        <Todolist
                            key={m.id}
                            todolistID={m.id}
                            title={m.titleTodolist}
                            tasks={tasks[m.id]}
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
