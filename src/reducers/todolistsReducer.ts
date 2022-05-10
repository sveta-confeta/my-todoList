
import {v1} from "uuid";
import {Dispatch} from "redux";
import {ItemType, todolistApi} from "../api/ todolist-api";

type ActionType = filteredTaskACType | removeTodolistACType | titleTodolistACType | addTodolistsACType | getTodolistsACType;
type filteredTaskACType = ReturnType<typeof filteredTaskAC>
type removeTodolistACType = ReturnType<typeof removeTodolistAC>
type titleTodolistACType = ReturnType<typeof titleTodolistAC>
export type addTodolistsACType = ReturnType<typeof addTodolistsAC>
export type  getTodolistsACType=ReturnType<typeof getTodolistsAC>

export const todolistsTasksID={todolistID_1:v1(),
    todolistID_2:v1()}

const initialState:Array<AllTodolistsType>=[
    // {id: todolistsTasksID.todolistID_1, titleTodolist: 'What to learn', filter: 'All'},
    // {id: todolistsTasksID.todolistID_2, titleTodolist: 'What to read', filter: 'All'},
];

export type ApiTodolistsType={
    "id": string,
    "title": string,
    "addedDate": string,
    "order": number,
}
export type AllTodolistsType=ApiTodolistsType & {filter:string} //добавляем к тому что приходит с сервера фильтр


export const TodolistReducer = (state: Array<AllTodolistsType>=initialState, action: ActionType): Array<AllTodolistsType> => {
    switch (action.type) {
        case 'FILTERED-TASK': {
            return state.map(m => m.id === action.todolistID ? {...m, filter: action.value} : m)
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(f => f.id !== action.todolistID)
        }
        case 'TITLE-TODOLIST': {
            return state.map(m => action.todolistID === m.id ? {...m, title: action.title} : m)
        }
        case  'ADD-TODOLIST': { //добавить еще один тодолист
            let  newTodolist:AllTodolistsType={...action.item,filter:'All'};
             return [newTodolist,...state]

            }
        case  'GET-TODOLISTS': { //добавть с апишки все тодолисты с нуля
            return action.todolists.map(m=>{
                return {...m,filter:'All'}
            })
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

export const addTodolistsAC = (item:ApiTodolistsType) => {
    return {
        type: 'ADD-TODOLIST',
       item,
        // newTodolistID:v1(), //генерируем 1 id и для тудулист и тасок если нет апи
    } as const
};

export const getTodolistsAC = (todolists:Array<ApiTodolistsType> ) => {
    return {
        type: 'GET-TODOLISTS',
        todolists,

    } as const
};

export const todolistsThunk=(dispatch:Dispatch )=>{
    todolistApi.getTodolist().then((res)=>{ //get запрос за тодолистами

      dispatch(getTodolistsAC(res.data))
    })
}

export const todolistDeleteThunkCreator=(todolistID:string)=>(dispatch:Dispatch )=>{
    todolistApi.deleteTodolist(todolistID).then((res)=>{ //удаление тодолистов
        dispatch(removeTodolistAC(todolistID))
    })
}
export const todolistAddThunkCreator=(title:string)=>(dispatch:Dispatch )=>{
    todolistApi.createNewTodolist(title).then((res)=>{ //удаление тодолистов
        dispatch(addTodolistsAC(res.data.data.item))
    })
}

export const titleTodolistThunkCreator=(todolistID:string,title:string)=>(dispatch:Dispatch )=>{
    todolistApi.updateTodoTitle(todolistID,title).then((res)=>{ //удаление тодолистов
        dispatch( titleTodolistAC(todolistID,title))
    })
}