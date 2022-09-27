import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore, Middleware} from 'redux';
import {TasksReducer} from "../reducers/tasksReducer";
import {TodolistReducer} from "../reducers/todolistsReducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {appReducer} from "../reducers/appReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authReducer} from "../reducers/authReducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    tasks: TasksReducer,
    todolists: TodolistReducer,
    app: appReducer,
    auth: authReducer,

})


//export const store = createStore(rootReducer,applyMiddleware(thunk)); //Redux store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(
                thunk
            )
           
});
export type AppRootType = typeof rootReducer;
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<AppRootType>
export type AppDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>;

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector //внутри типизация стейта всего приложения

export const useAppDispatch = () => useDispatch<AppDispatch>()


// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

