import {v1} from "uuid";
import {Dispatch} from "redux";
import {todolistApi} from "../api/ todolist-api";
import { errorAppMessageAC, RequestStatusType, setAppStatusAC} from "./appReducer";
import {handleServerNetworkError} from "../utils/error-util";
import {AxiosError} from "axios";


export const todolistsTasksID = {
    todolistID_1: v1(),
    todolistID_2: v1()
}

const initialState: Array<AllTodolistsType> = [
    //он у нас изначально пустой, все свойства через типизацию добавляются
    // {id: todolistsTasksID.todolistID_1, titleTodolist: 'What to learn', filter: 'All'},
    // {id: todolistsTasksID.todolistID_2, titleTodolist: 'What to read', filter: 'All'},
];


export const TodolistReducer = (state: Array<AllTodolistsType> = initialState, action: ActionType): Array<AllTodolistsType> => {
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
        case 'DISABLED-STATUS': {
            return state.map(m => action.todolistID === m.id ? {...m, disabledStatus: action.disabledStatus} : m)
        }
        case  'ADD-TODOLIST': { //добавить еще один тодолист
            let newTodolist: AllTodolistsType = {...action.item, filter: 'All', disabledStatus: 'failed'};
            return [newTodolist, ...state]

        }
        case  'GET-TODOLISTS': { //добавть с апишки все тодолисты с нуля
            return action.todolists.map(m => {
                return {...m, filter: 'All', disabledStatus: 'failed'}
            })
        }
        default:
            return state;
    }
}


export const filteredTaskAC = (todolistID: string, value: string) => ({
    type: 'FILTERED-TASK', todolistID,
    value,
} as const);

export const removeTodolistAC = (todolistID: string) => ({type: 'REMOVE-TODOLIST', todolistID} as const)

export const titleTodolistAC = (todolistID: string, title: string) => ({
    type: 'TITLE-TODOLIST',
    todolistID, title
} as const);

export const addTodolistsAC = (item: ApiTodolistsType) => ({type: 'ADD-TODOLIST', item,} as const); // newTodolistID:v1(), //генерируем 1 id и для тудулист и тасок если нет апи

export const getTodolistsAC = (todolists: Array<ApiTodolistsType>) => ({type: 'GET-TODOLISTS', todolists,} as const);

export const disabledStatusTodolistAC = (todolistID: string, disabledStatus: RequestStatusType) => ({
    type: 'DISABLED-STATUS',
    todolistID, disabledStatus,
} as const);//disabled buttons

export const todolistsThunk =()=> (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.getTodolist().then((res) => { //get запрос за тодолистами
        dispatch(setAppStatusAC('failed'))
        dispatch(getTodolistsAC(res.data))
    })
}

export const todolistDeleteThunkCreator = (todolistID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading')) //крутилка включилась
    dispatch(disabledStatusTodolistAC(todolistID, 'loading')); //кнопка дизаблется
    todolistApi.deleteTodolist(todolistID)
        .then((res) => { //удаление тодолистов
            dispatch(setAppStatusAC('failed'))//крутилка отключилась
            // dispatch(disabledStatusTodolistAC(todolistID,'failed')); мы удаляем тодолист, поэтому нет смысла восстанавливать кнопку
            dispatch(removeTodolistAC(todolistID))
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err, dispatch)
            // dispatch(setAppStatusAC('failed'))//крутилка отключилась
            // dispatch(errorAppMessageAC(err.message))

        })
}
export const todolistAddThunkCreator = (title: string) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatusAC('loading'))
            const res = await todolistApi.createNewTodolist(title)
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC('failed'))
                dispatch(addTodolistsAC(res.data.data.item))
            } else {
                dispatch(setAppStatusAC('failed'))
                dispatch(errorAppMessageAC(res.data.messages[0])); //достаем из массива сообщение об ошибке
            }
        } catch (err) {
            let error = err as AxiosError
            handleServerNetworkError(error, dispatch)
        }
    };
}

export const titleTodolistThunkCreator = (todolistID: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.updateTodoTitle(todolistID, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC('failed'))
                dispatch(titleTodolistAC(todolistID, title))
            } else {
                dispatch(setAppStatusAC('failed'))
                dispatch(errorAppMessageAC(res.data.messages[0])); //достаем из массива сообщение об ошибке
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err,dispatch)
        })
}
//types
export type ActionType = ReturnType<typeof filteredTaskAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistsAC>
    | ReturnType<typeof titleTodolistAC>
    | ReturnType<typeof getTodolistsAC>
    | ReturnType<typeof setAppStatusAC> //крутилка
    | ReturnType<typeof errorAppMessageAC> //ошибка
    | ReturnType<typeof disabledStatusTodolistAC> //disabled


export type ApiTodolistsType = {
    "id": string,
    "title": string,
    "addedDate": string,
    "order": number,
}
export type AllTodolistsType = ApiTodolistsType & { filter: string, disabledStatus: RequestStatusType } //добавляем к тому что приходит с сервера фильтр
