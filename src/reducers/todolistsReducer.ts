import {v1} from "uuid";
import {Dispatch} from "redux";
import {todolistApi} from "../api/ todolist-api";
import {errorAppMessageAC, RequestStatusType, setAppStatusAC} from "./appReducer";
import {handleServerNetworkError} from "../utils/error-util";
import {AxiosError} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export const todolistsTasksID = {
    todolistID_1: v1(),
    todolistID_2: v1()
}

const initialState: Array<AllTodolistsType> = [
    //он у нас изначально пустой, все свойства через типизацию добавляются
    // {id: todolistsTasksID.todolistID_1, titleTodolist: 'What to learn', filter: 'All'},
    // {id: todolistsTasksID.todolistID_2, titleTodolist: 'What to read', filter: 'All'},
];

export const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        filteredTaskAC(state, action: PayloadAction<{ todolistID: string, value: string }>) {
            const index = state.findIndex(fi => fi.id === action.payload.todolistID);
            state[index].filter=action.payload.value;
        },
        removeTodolistAC(state, action: PayloadAction<{ todolistID: string }>) {
            const index = state.findIndex(fi => fi.id === action.payload.todolistID);
            if (index > -1) {
                state.splice(index, 1);
            }

        },
        titleTodolistAC(state, action: PayloadAction<{ todolistID: string, title: string }>) {
            const index = state.findIndex(fi => fi.id === action.payload.todolistID);
            state[index].title=action.payload.title;
        },
        addTodolistsAC(state, action: PayloadAction<{ item: ApiTodolistsType }>) {
            state.unshift({...action.payload.item, filter: 'All', disabledStatus: 'failed'})
        },
        getTodolistsAC(state, action: PayloadAction<{ todolists: Array<ApiTodolistsType> }>) {
            return action.payload.todolists.map(m => ({...m, filter: 'All', disabledStatus: 'failed'}))
        },
        disabledStatusTodolistAC(state, action: PayloadAction<{ todolistID: string, disabledStatus: RequestStatusType }>) {
            const index = state.findIndex(fi => fi.id === action.payload.todolistID);
            state[index].disabledStatus=action.payload.disabledStatus
        },
    }

});

export const TodolistReducer = slice.reducer;
export const {
    filteredTaskAC, removeTodolistAC, titleTodolistAC, addTodolistsAC,
    getTodolistsAC, disabledStatusTodolistAC
} = slice.actions;
// export const TodolistReducer = (state: Array<AllTodolistsType> = initialState, action: ActionType): Array<AllTodolistsType> => {
//     switch (action.type) {
//         case 'FILTERED-TASK': {
//             return state.map(m => m.id === action.todolistID ? {...m, filter: action.value} : m)
//         }
//         case 'REMOVE-TODOLIST': {
//
//         }
//         case 'TITLE-TODOLIST': {
//             return state.map(m => action.todolistID === m.id ? {...m, title: action.title} : m)
//         }
//         case 'DISABLED-STATUS': {
//             return state.map(m => action.todolistID === m.id ? {...m, disabledStatus: action.disabledStatus} : m)
//         }
//         case  'ADD-TODOLIST': { //добавить еще один тодолист
//             let newTodolist: AllTodolistsType = {...action.item, filter: 'All', disabledStatus: 'failed'};
//             return [newTodolist, ...state]
//
//         }
//         case  'GET-TODOLISTS': { //добавть с апишки все тодолисты с нуля
//             return action.todolists.map(m => {
//                 return {...m, filter: 'All', disabledStatus: 'failed'}
//             })
//         }
//         default:
//             return state;
//     }
// }


//export const filteredTaskAC = (todolistID: string, value: string) => ({
//  type: 'FILTERED-TASK', todolistID,
//   value,
//} as const);

//export const removeTodolistAC = (todolistID: string) => ({type: 'REMOVE-TODOLIST', todolistID} as const)

//export const titleTodolistAC = (todolistID: string, title: string) => ({
//  type: 'TITLE-TODOLIST',
//todolistID, title
//} as const);

//export const addTodolistsAC = (item: ApiTodolistsType) => ({type: 'ADD-TODOLIST', item,} as const); // newTodolistID:v1(), //генерируем 1 id и для тудулист и тасок если нет апи

//export const getTodolistsAC = (todolists: Array<ApiTodolistsType>) => ({type: 'GET-TODOLISTS', todolists,} as const);

//export const disabledStatusTodolistAC = (todolistID: string, disabledStatus: RequestStatusType) => ({
//   type: 'DISABLED-STATUS',
//   todolistID, disabledStatus,
//} as const);//disabled buttons

export const todolistsThunk = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({value: 'loading'}))
    todolistApi.getTodolist().then((res) => { //get запрос за тодолистами
        dispatch(setAppStatusAC({value: 'failed'}))
        dispatch(getTodolistsAC({todolists: res.data}))
    })
}

export const todolistDeleteThunkCreator = (todolistID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({value: 'loading'})) //крутилка включилась
    dispatch(disabledStatusTodolistAC({todolistID: todolistID, disabledStatus: 'loading'})); //кнопка дизаблется
    todolistApi.deleteTodolist(todolistID)
        .then((res) => { //удаление тодолистов
            dispatch(setAppStatusAC({value: 'failed'}))//крутилка отключилась
            // dispatch(disabledStatusTodolistAC(todolistID,'failed')); мы удаляем тодолист, поэтому нет смысла восстанавливать кнопку
            dispatch(removeTodolistAC({todolistID: todolistID}))
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
            dispatch(setAppStatusAC({value: 'loading'}))
            const res = await todolistApi.createNewTodolist(title)
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({value: 'failed'}))
                dispatch(addTodolistsAC({item: res.data.data.item}))
            } else {
                dispatch(setAppStatusAC({value: 'failed'}))
                dispatch(errorAppMessageAC({value: res.data.messages[0]})); //достаем из массива сообщение об ошибке
            }
        } catch (err) {
            let error = err as AxiosError
            handleServerNetworkError(error, dispatch)
        }
    };
}

export const titleTodolistThunkCreator = (todolistID: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({value: 'loading'}))
    todolistApi.updateTodoTitle(todolistID, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({value: 'failed'}))
                dispatch(titleTodolistAC({todolistID: todolistID, title: title}))
            } else {
                dispatch(setAppStatusAC({value: 'failed'}))
                dispatch(errorAppMessageAC({value: res.data.messages[0]})); //достаем из массива сообщение об ошибке
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err, dispatch)
        })
}

export type ApiTodolistsType = {
    "id": string,
    "title": string,
    "addedDate": string,
    "order": number,
}
export type AllTodolistsType = ApiTodolistsType & { filter: string, disabledStatus: RequestStatusType } //добавляем к тому что приходит с сервера фильтр
