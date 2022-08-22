import {Dispatch} from "redux";
import {authAPI} from "../api/ todolist-api";
import {setIsLoggedInAC} from "./authReducer";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../utils/error-util";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
}
//если статус 'loading' показываем крутилку
// если статус 'idle', 'succeeded' | 'failed' -прячем крутилку

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ value: RequestStatusType }>) {
            state.status = action.payload.value
        },
        errorAppMessageAC(state, action: PayloadAction<{ value: string | null }>) {
            state.error = action.payload.value
        },
        initializedAC(state, action: PayloadAction<{ value: boolean }>) {
            debugger
            state.isInitialized = action.payload.value
        },
    }

});

export const appReducer = slice.reducer;

export const {setAppStatusAC, errorAppMessageAC, initializedAC} = slice.actions;


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


export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({value: 'loading'})) //крутилка вкл
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({value: 'failed'})) //крутилка выкл
                dispatch(setIsLoggedInAC({value: true}));
            } else {
                dispatch(setAppStatusAC({value: 'failed'}))
                dispatch(errorAppMessageAC({value: res.data.messages[0]})); //достаем из массива сообщение об ошибке
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err, dispatch)
        })
        .finally(() => {
            dispatch(initializedAC({value: true}));
        })
}


export type AppActionsType = ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof errorAppMessageAC>
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setAppStatusAC> //крутилка
    | ReturnType<typeof errorAppMessageAC> //ошибка
    | ReturnType<typeof initializedAC> //инициализация
