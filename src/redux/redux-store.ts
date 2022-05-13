

import {applyMiddleware, combineReducers, createStore} from 'redux';
import {TasksReducer} from "../reducers/tasksReducer";
import {TodolistReducer} from "../reducers/todolistsReducer";
import thunk from "redux-thunk";
import {appReducer} from "../reducers/appReducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: TasksReducer ,
    todolists:  TodolistReducer,
    app:appReducer,

})
// непосредственно создаём store
export const store = createStore(rootReducer,applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector //внутри типизация стейта всего приложения

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

