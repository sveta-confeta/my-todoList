import {v1} from "uuid";
import {Dispatch} from "redux";
import {todolistApi} from "../api/ todolist-api";
import {errorAppMessageAC, RequestStatusType, setAppStatusAC} from "./appReducer";
import {handleServerNetworkError} from "../utils/error-util";
import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


export const todolistsTasksID = {
    todolistID_1: v1(),
    todolistID_2: v1()
}

const initialState: Array<AllTodolistsType> = [
    //он у нас изначально пустой, все свойства через типизацию добавляются
    // {id: todolistsTasksID.todolistID_1, titleTodolist: 'What to learn', filter: 'All'},
    // {id: todolistsTasksID.todolistID_2, titleTodolist: 'What to read', filter: 'All'},
];

export const todolistsThunk = createAsyncThunk('task/todolistsThunk', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({value: 'loading'}))
    const res = await todolistApi.getTodolist()
    try {
        thunkAPI.dispatch(setAppStatusAC({value: 'failed'}))
        return {todolists: res.data}

    } //get запрос за тасками. хочет id тодолиста в котором создавать будем таски
    catch (err: any) {
        handleServerNetworkError(err, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }

})


export const todolistDeleteThunkCreator = createAsyncThunk('task/todolistDelete', async (todolistID: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({value: 'loading'}))
    thunkAPI.dispatch(disabledStatusTodolistAC({todolistID, disabledStatus: 'loading'})); //кнопка дизаблется
    const res = await todolistApi.deleteTodolist(todolistID)
    try {
        thunkAPI.dispatch(setAppStatusAC({value: 'failed'}))
        // dispatch(disabledStatusTodolistAC(todolistID,'failed')); мы удаляем тодолист, поэтому нет смысла восстанавливать кнопку
        return {todolistID: todolistID}

    } //get запрос за тасками. хочет id тодолиста в котором создавать будем таски
    catch (err: any) {
        handleServerNetworkError(err, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }

})

export const todolistAddThunkCreator = createAsyncThunk('task/todolistAdd', async (title: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({value: 'loading'}))
    const res = await todolistApi.createNewTodolist(title)
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({value: 'failed'}))
            return  {item: res.data.data.item}
        } else {
            thunkAPI.dispatch(setAppStatusAC({value: 'failed'}))
            thunkAPI.dispatch(errorAppMessageAC({value: res.data.messages[0]})); //достаем из массива сообщение об ошибке
            return thunkAPI.rejectWithValue({})
        }
    } //get запрос за тасками. хочет id тодолиста в котором создавать будем таски
    catch (err: any) {
        handleServerNetworkError(err, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }
})

export const titleTodolistThunkCreator = createAsyncThunk('task/titleTodolis', async (param:{todolistID: string, title: string}, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({value: 'loading'}))
    const res = await todolistApi.updateTodoTitle(param.todolistID, param.title)
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({value: 'failed'}))
           return {todolistID: param.todolistID, title: param.title}
        } else {
            thunkAPI.dispatch(setAppStatusAC({value: 'failed'}))
            thunkAPI.dispatch(errorAppMessageAC({value: res.data.messages[0]})); //достаем из массива сообщение об ошибке
            return thunkAPI.rejectWithValue({})
        }
    } //get запрос за тасками. хочет id тодолиста в котором создавать будем таски
    catch (err: any) {
        handleServerNetworkError(err, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }
})

export const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        filteredTaskAC(state, action: PayloadAction<{ todolistID: string, value: string }>) {
            const index = state.findIndex(fi => fi.id === action.payload.todolistID);
            state[index].filter = action.payload.value;
        },
        disabledStatusTodolistAC(state, action: PayloadAction<{ todolistID: string, disabledStatus: RequestStatusType }>) {
            const index = state.findIndex(fi => fi.id === action.payload.todolistID);
            state[index].disabledStatus = action.payload.disabledStatus
        },

    },
    extraReducers: builder => {
        builder.addCase(todolistsThunk.fulfilled, (state, action) => {
            return action.payload.todolists.map(m => ({...m, filter: 'All', disabledStatus: 'failed'}))
        })
        builder.addCase(todolistDeleteThunkCreator.fulfilled, (state, action) => {
            const index = state.findIndex(fi => fi.id === action.payload.todolistID);
            if (index > -1) {
                state.splice(index, 1);
            }
        })
        builder.addCase(todolistAddThunkCreator.fulfilled, (state, action) => {
            state.unshift({...action.payload.item, filter: 'All', disabledStatus: 'failed'})
        })
        builder.addCase(titleTodolistThunkCreator.fulfilled, (state, action) => {
            const index = state.findIndex(fi => fi.id === action.payload.todolistID);
            state[index].title = action.payload.title;
        })

    }

});

export const TodolistReducer = slice.reducer;
export const {
    filteredTaskAC,
    disabledStatusTodolistAC
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


export type ApiTodolistsType = {
    "id": string,
    "title": string,
    "addedDate": string,
    "order": number,
}
export type AllTodolistsType = ApiTodolistsType & { filter: string, disabledStatus: RequestStatusType } //добавляем к тому что приходит с сервера фильтр
