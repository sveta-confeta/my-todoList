import {Dispatch} from "redux";
import {authAPI} from "../api/ todolist-api";
import {setIsLoggedInAC} from "./authReducer";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../utils/error-util";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
     isInitialized:false,
}
//если статус 'loading' показываем крутилку
// если статус 'idle', 'succeeded' | 'failed' -прячем крутилку

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP-ERROR':
            return {...state, error: action.error}
        case 'INITIALIZED':
            return {...state,  isInitialized: action.value}

        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status,} as const);
export const errorAppMessageAC = (error: string | null) => ({type: 'APP-ERROR', error,} as const);
export const initializedAC = (value: boolean) => ({type: 'INITIALIZED', value,} as const);



export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading')) //крутилка вкл
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC('failed')) //крутилка выкл
                dispatch(setIsLoggedInAC({value:true}));
            } else {
                dispatch(setAppStatusAC('failed'))
                dispatch(errorAppMessageAC(res.data.messages[0])); //достаем из массива сообщение об ошибке
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err,dispatch)
        })
        .finally(()=>{
            dispatch(initializedAC(true));
        })
}


export type AppActionsType = ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof errorAppMessageAC>
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setAppStatusAC> //крутилка
    | ReturnType<typeof errorAppMessageAC> //ошибка
| ReturnType<typeof initializedAC> //инициализация
