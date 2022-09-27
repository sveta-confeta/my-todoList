//Глядите, выше мы заюзали наш рабочий store для примера в Storybook-e. Пустой state у нас.. так себе для демонстрации вариант.
//Давайте для сторибука при создании заполним стор какими-то данными.

import {combineReducers} from "redux";
import {Provider} from "react-redux";
import {TasksReducer} from "../reducers/tasksReducer";
import {TodolistReducer} from "../reducers/todolistsReducer";
import {TaskPriorities, TaskStatuses} from "../api/ todolist-api";
import {appReducer} from "../reducers/appReducer";
import thunk from "redux-thunk";
import {AppRootStateType, AppRootType} from "./redux-store";
import {authReducer} from "../reducers/authReducer";
import {configureStore} from "@reduxjs/toolkit";
import {HashRouter} from "react-router-dom";

const rootReducer: AppRootType = combineReducers({
    tasks: TasksReducer,
    todolists: TodolistReducer,
    app: appReducer,
    auth: authReducer,

})
//когда создаем вне новый редьюсер, нужно его сдесь записывать
const initialGlobalState: AppRootStateType = {
    todolists: [    //стартовый стейт для сторибук
        {
            id: "todolistId1", title: "What to learn", filter: "All", addedDate: '', disabledStatus: 'failed',
            order: 0
        },
        {
            id: "todolistId2", title: "What to buy", filter: "All", addedDate: '', disabledStatus: 'failed',
            order: 0
        },
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: '1',
                title: 'Css',
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "todolistId1",
                order: 0,
                addedDate: '',
                disabledStatus: 'idle'
            },
            {
                id: '2',
                title: 'JS',
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "todolistId1",
                order: 0,
                addedDate: '',
                disabledStatus: 'idle'
            }
        ],
        ["todolistId2"]: [
            {
                id: '1',
                title: "Milk",
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "todolistId2",
                order: 0,
                addedDate: '',
                disabledStatus: 'idle'
            },
            {
                id: '2',
                title: "React Book",
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "todolistId2",
                order: 0,
                addedDate: '',
                disabledStatus: 'idle'
            }
        ]
    },
    app: {
        status: 'succeeded', error: null, isInitialized: true,
    },
    auth: {
        isLoggedIn: true,
    }
};
// type GlobalStateType = ReturnType<typeof rootReducer>
//     //storyBookStore-отправляем в провайдер:

// export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunk) ); когда был просто redux
//когда redux-toolkit:
export const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(
                thunk
            )

});

// applyMiddleware тоже подключаем к стору, чтоб работали санки. это почти как стор приложения только для сторибук
export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
export const BrowserRouterDecorator = (storyFn: any) => (
    <HashRouter>
        {storyFn()}
    </HashRouter>)
