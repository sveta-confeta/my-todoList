import React, {useCallback, useEffect} from 'react';
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";
import CircularProgress from "@mui/material/CircularProgress";
import {AddItemForm} from "./components/AddItemsForm/AddItemForm";
import {Todolist} from "./Todolist";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch, useAppSelector} from "./redux/redux-store";
import { StateType, TasksAddThunkCreator} from "./reducers/tasksReducer";
import {
    AllTodolistsType,
    filteredTaskAC,
    titleTodolistThunkCreator,
    todolistAddThunkCreator,
    todolistDeleteThunkCreator,
    todolistsThunk
} from "./reducers/todolistsReducer";
import {RequestStatusType} from "./reducers/appReducer";
import {useNavigate} from "react-router-dom";


export const CreateTodolists = () => {
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

    const tasks = useSelector<AppRootStateType, StateType>(state => state.tasks);
    const todolists = useSelector<AppRootStateType, Array<AllTodolistsType>>(state => state.todolists);
    const status = useAppSelector<RequestStatusType>(state => state.app.status); //для крутилки
    const isLogin= useAppSelector<boolean>(state => state.auth.isLoggedIn);
    const navigate =useNavigate();

    const dispatch = useAppDispatch()

    useEffect(() => {
         if(isLogin){
            dispatch(todolistsThunk()); //если залогинены то запрос за тодолистами
        } else{
             navigate('login') //если нет-то на страницу логин
         }

    }, [isLogin]) //1 раз нужно получить тодолисты

    const addTask = useCallback((todolistID: string, value: string) => { //функция добавить таску через инпут
        // const copyTasks = {...tasks};
        // copyTasks[todolistID] = [{id: v1(), task: value, isDone: false}, ...tasks[todolistID]];
        // setTasks(copyTasks);
        dispatch(TasksAddThunkCreator({todolistID, title:value}))
    }, [])


    const filteredTask = useCallback((todolistID: string, value: string) => {
        //setTodolist(todolist.map(m=> m.id===todolistID ? {...m,filter:value}: m)
        dispatch(filteredTaskAC({todolistID, value}))
    }, [dispatch, filteredTaskAC]);

    const removeTodolist = useCallback((todolistID: string) => {
        // setTodolists(todolists.filter(f => f.id !== todolistID))
        dispatch(todolistDeleteThunkCreator(todolistID))
    }, [dispatch]);

    const addTodolists = useCallback((titleTodolist: string) => {
        // [...todolists, {id: newTodolistID, titleTodolist: titleTodolist, filter: 'All' //для тодолистредьюсер
        // const newTodolistID = v1();
        // {...tasks, [newTodolistID]: []}//для таскредьюсер
        let action = todolistAddThunkCreator(titleTodolist);//чтоб мы не повторяли вызов функции 2 раза
        dispatch(action);

    }, [])


    const titleTodolist = useCallback((todolistID: string, title: string) => {
        // setTodolists(todolists.map(m => todolistID === m.id ? {...m, titleTodolist: title} : m));
        dispatch(titleTodolistThunkCreator({todolistID, title}))
    }, []);

    // if(!isLogin){
    //   return   <Navigate to ={`login`}/ эту логику мы прописали вверху в else
    // }


    return (
        <div>
            <ErrorSnackbar/>
            {/*крутилка:*/}
            {status === 'loading' && <CircularProgress disableShrink/>}
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
};
