


//Глядите, выше мы заюзали наш рабочий store для примера в Storybook-e. Пустой state у нас.. так себе для демонстрации вариант.
//Давайте для сторибука при создании заполним стор какими-то данными.

import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import {TasksReducer} from "../reducers/tasksReducer";
import {TodolistReducer} from "../reducers/todolistsReducer";
import {TaskPriorities, TaskStatuses} from "../api/ todolist-api";

const rootReducer = combineReducers({
    tasks: TasksReducer,
    todolists:TodolistReducer,
})

const initialGlobalState = {
    todolists: [    //стартовый стейт для сторибук
        {id: "todolistId1", title: "What to learn", filter: "All", "addedDate": '',
            "order": 0},
        {id: "todolistId2", title: "What to buy", filter: "All", "addedDate": '',
            "order": 0},
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
    }
};
//storyBookStore-отправляем в провайдер:
 export const storyBookStore = createStore(rootReducer, initialGlobalState);


export const ReduxStoreProviderDecorator=(storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}