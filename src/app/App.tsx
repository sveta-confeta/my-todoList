import React, {useCallback, useEffect} from 'react';
import './App.css';

import { Todolist} from "../Todolist";
import {AddItemForm} from "../components/AddItemsForm/AddItemForm";
import {addTaskAC, TasksAddThunkCreator} from "../reducers/tasksReducer";
import {
    AllTodolistsType,
    filteredTaskAC,
    titleTodolistThunkCreator, todolistAddThunkCreator, todolistDeleteThunkCreator, todolistsThunk,
} from "../reducers/todolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppSelector} from "../redux/redux-store";
import {ItemType, todolistApi} from "../api/ todolist-api";
import CircularProgress from "@mui/material/CircularProgress";
import {RequestStatusType} from "../reducers/appReducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";





export type StateType = {
    [key: string]: Array<ItemType>
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
    const todolists=useSelector<AppRootStateType,Array<AllTodolistsType>>(state=>state.todolists);
    const status=useAppSelector<RequestStatusType>(state=>state.app.status); //для крутилки

    const dispatch=useDispatch()

     useEffect(()=>{
         dispatch(todolistsThunk);
     },[]) //1 раз нужно получить тодолисты

    const addTask =useCallback(  (todolistID: string, value: string) => { //функция добавить таску через инпут
        // const copyTasks = {...tasks};
        // copyTasks[todolistID] = [{id: v1(), task: value, isDone: false}, ...tasks[todolistID]];
        // setTasks(copyTasks);
        dispatch(TasksAddThunkCreator(todolistID, value))
    },[dispatch,addTaskAC])



    const filteredTask = useCallback((todolistID:string,value: string) => {
        //setTodolist(todolist.map(m=> m.id===todolistID ? {...m,filter:value}: m)
        dispatch(filteredTaskAC( todolistID,value))
    },[ dispatch,filteredTaskAC]);

    const removeTodolist =useCallback( (todolistID: string) => {
        // setTodolists(todolists.filter(f => f.id !== todolistID))
        dispatch(todolistDeleteThunkCreator(todolistID))
    },[dispatch]);

    const addTodolists =useCallback(  (titleTodolist: string) => {
        // [...todolists, {id: newTodolistID, titleTodolist: titleTodolist, filter: 'All' //для тодолистредьюсер
        // const newTodolistID = v1();
        // {...tasks, [newTodolistID]: []}//для таскредьюсер
        let action=todolistAddThunkCreator(titleTodolist);//чтоб мы не повторяли вызов функции 2 раза
        dispatch(action);

    },[])



    const titleTodolist =useCallback( (todolistID: string,title: string) => {
        // setTodolists(todolists.map(m => todolistID === m.id ? {...m, titleTodolist: title} : m));
        dispatch(titleTodolistThunkCreator(todolistID,title))
    },[ ]);


    return (
        <div className="App">
            <ErrorSnackbar/>
            {/*крутилка:*/}
            { status==='loading' && <CircularProgress disableShrink/> }

            <div className={'CreateTodolists'}>
            <AddItemForm addTask={addTodolists}/>
            </div>

            <div className={'appWrapper'}>
                {todolists.map(m => {



                    return (
                        <Todolist
                            disabledStatus={m.disabledStatus}
                            key={m.id}
                            todolistID={m.id}
                            title={m.title}
                            tasks={tasks[m.id]}
                            filteredTask={filteredTask}
                            addTask={addTask}
                            filter={m.filter}
                            removeTodolist={removeTodolist}
                            titleTodolist={titleTodolist}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default App;
