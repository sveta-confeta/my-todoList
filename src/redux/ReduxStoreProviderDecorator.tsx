


//Глядите, выше мы заюзали наш рабочий store для примера в Storybook-e. Пустой state у нас.. так себе для демонстрации вариант.
//Давайте для сторибука при создании заполним стор какими-то данными.

import {applyMiddleware, combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import {TasksReducer} from "../reducers/tasksReducer";
import {TodolistReducer} from "../reducers/todolistsReducer";
import {TaskPriorities, TaskStatuses} from "../api/ todolist-api";
import {appReducer} from "../reducers/appReducer";
import thunk from "redux-thunk";
import {AppRootStateType} from "./redux-store";

const rootReducer = combineReducers({
    tasks: TasksReducer,
    todolists:TodolistReducer,
    app:appReducer,
})
//когда создаем вне новый редьюсер, нужно его сдесь записывать
const initialGlobalState:AppRootStateType = {
    todolists: [    //стартовый стейт для сторибук
        {id: "todolistId1", title: "What to learn", filter: "All", addedDate: '',disabledStatus: 'failed',
            order: 0},
        {id: "todolistId2", title: "What to buy", filter: "All", addedDate: '' ,disabledStatus:'failed',
            order: 0},
    ] ,
    tasks: {
        ["todolistId1"]: [
            { id: '1', title: 'Css', description: '', status:TaskStatuses.New, priority:TaskPriorities.Low , startDate: '', deadline: '',  todoListId:"todolistId1",
                           order: 0, addedDate: ''},
            {id: '2', title: 'JS',
                description: '', status:TaskStatuses.New, priority:TaskPriorities.Low , startDate: '', deadline: '', todoListId: "todolistId1",
                order: 0, addedDate: ''}
        ],
        ["todolistId2"]: [
            { id: '1', title:  "Milk", description: '', status:TaskStatuses.New, priority:TaskPriorities.Low , startDate: '', deadline: '',  todoListId:"todolistId2",
                order: 0, addedDate: ''},
            {id: '2', title:  "React Book",
                description: '', status:TaskStatuses.New, priority:TaskPriorities.Low , startDate: '', deadline: '', todoListId:"todolistId2",
                order: 0, addedDate: ''}
        ]
    },
    app:{
        status:'idle',error:null
    }
};
type GlobalStateType = ReturnType<typeof rootReducer>
    //storyBookStore-отправляем в провайдер:

 export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunk) );

 // applyMiddleware тоже подключаем к стору, чтоб работали санки. это почти как стор приложения только для сторибук
export const ReduxStoreProviderDecorator=(storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}