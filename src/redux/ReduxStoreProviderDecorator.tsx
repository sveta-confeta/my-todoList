


//Глядите, выше мы заюзали наш рабочий store для примера в Storybook-e. Пустой state у нас.. так себе для демонстрации вариант.
//Давайте для сторибука при создании заполним стор какими-то данными.

import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import {AppRootStateType} from "./redux-store";
import {v1} from "uuid";
import {TasksReducer} from "../reducers/tasksReducer";
import {TodolistReducer} from "../reducers/todolistsReducer";

const rootReducer = combineReducers({
    tasks: TasksReducer,
    todolists:TodolistReducer,
})

const initialGlobalState = {
    todolists: [    //стартовый стейт для сторибук
        {id: "todolistId1", titleTodolist: "What to learn", filter: "All"},
        {id: "todolistId2", titleTodolist: "What to buy", filter: "All"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), task: "HTML&CSS", isDone: true},
            {id: v1(), task: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), task: "Milk", isDone: true},
            {id: v1(), task: "React Book", isDone: true}
        ]
    }
};
//storyBookStore-отправляем в провайдер:
 export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator=(storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}