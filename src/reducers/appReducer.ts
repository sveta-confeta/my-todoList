import {Dispatch} from "redux";
import {authAPI} from "../api/ todolist-api";
import {setIsLoggedInAC} from "./authReducer";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../utils/error-util";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
}
//если статус 'loading' показываем крутилку
// если статус 'idle', 'succeeded' | 'failed' -прячем крутилку

export const initializeAppTC = createAsyncThunk('app/initializeApp', async (param,thunkAPI)  => {
    thunkAPI.dispatch(setAppStatusAC({value: 'loading'})) //крутилка вкл
    try {
        const res = await authAPI.me();
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({value: 'failed'})) //крутилка выкл
           //при удачном запросе автоматом попадаем в экстраредьюссер фулфилд и там меняется initial state
        } else {
            thunkAPI.dispatch(setAppStatusAC({value: 'failed'}))
            thunkAPI.dispatch(errorAppMessageAC({value: res.data.messages[0]})); //достаем из массива сообщение об ошибке
        }
    }
    catch(err:any) {
            handleServerNetworkError(err, thunkAPI.dispatch)
        }
    finally{
             return; //тоже всегда попадаем в экстраредьюссер и меняем логику
        }


})
const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ value: RequestStatusType }>) {
            state.status = action.payload.value
        },
        errorAppMessageAC(state, action: PayloadAction<{ value: string | null }>) {
            state.error = action.payload.value
        }
    },
    extraReducers:builder => {
        builder.addCase(initializeAppTC.fulfilled,(state)=>{
        state.isInitialized=true;
    })}

});

export const appReducer = slice.reducer;

export const {setAppStatusAC, errorAppMessageAC} = slice.actions;


// export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//             return {...state, status: action.status}
//         case 'APP-ERROR':
//             return {...state, error: action.error}
//         case 'INITIALIZED':
//             return {...state,  isInitialized: action.value}
//
//         default:
//             return state
//     }
// }

//export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status,} as const);
//export const errorAppMessageAC = (error: string | null) => ({type: 'APP-ERROR', error,} as const);
//export const initializedAC = (value: boolean) => ({type: 'INITIALIZED', value,} as const);





export type AppActionsType = ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof errorAppMessageAC>
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setAppStatusAC> //крутилка
    | ReturnType<typeof errorAppMessageAC> //ошибка

