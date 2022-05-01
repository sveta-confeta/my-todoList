import {StateType, todolistType} from "../App";
import {v1} from "uuid";

type ActionType = filteredTaskACType | removeTodolistACType | titleTodolistACType | addTodolistsACType;
type filteredTaskACType = ReturnType<typeof filteredTaskAC>
type removeTodolistACType = ReturnType<typeof removeTodolistAC>
type titleTodolistACType = ReturnType<typeof titleTodolistAC>
export type addTodolistsACType = ReturnType<typeof addTodolistsAC>

export const todolistsTasksID={todolistID_1:v1(),
    todolistID_2:v1()}

const initialState:Array<todolistType>=[
    {id: todolistsTasksID.todolistID_1, titleTodolist: 'What to learn', filter: 'All'},
    {id: todolistsTasksID.todolistID_2, titleTodolist: 'What to read', filter: 'All'},
];

export const TodolistReducer = (state: Array<todolistType>=initialState, action: ActionType): Array<todolistType> => {
    switch (action.type) {
        case 'FILTERED-TASK': {
            return state.map(m => m.id === action.todolistID ? {...m, filter: action.value} : m)
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(f => f.id !== action.todolistID)
        }
        case 'TITLE-TODOLIST': {
            return state.map(m => action.todolistID === m.id ? {...m, titleTodolist: action.title} : m)
        }
        case  'ADD-TODOLIST': {
            return [...state, {id:action.newTodolistID, titleTodolist: action.titleTodolist, filter: 'All'} ];
        }
        default:
            return state;
    }
}


export const filteredTaskAC = (todolistID: string, value: string) => {
    return {
        type: 'FILTERED-TASK',
        todolistID,
        value,

    } as const
}

export const removeTodolistAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        todolistID,
    } as const
};
export const titleTodolistAC = (todolistID: string, title: string) => {
    return {
        type: 'TITLE-TODOLIST',
        todolistID,
        title
    } as const
};

export const addTodolistsAC = (titleTodolist: string) => {
    return {
        type: 'ADD-TODOLIST',
        titleTodolist,
         newTodolistID:v1(), //генерируем 1 id и для тудулист и тасок
    } as const
};